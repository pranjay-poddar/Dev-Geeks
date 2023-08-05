#include "prompt.h"
#include "process.h"
#include "headers.h"
#include "history.h"
#include "execute.h"
#include "autocomplete.h"
#include <assert.h>

char* oldpwd;
char* home_directory;
time_t time_taken_by_last_command;

struct job* jobs;
struct termios orig_termios;

void disableRawMode() {
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &orig_termios);
}

void enableRawMode() {
    tcgetattr(STDIN_FILENO, &orig_termios);
    atexit(disableRawMode);
    struct termios raw = orig_termios;
    raw.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw);
}

void addtostring(char* string, long unsigned* length, char c, int index) {
    if ((long unsigned)index+1 == (long unsigned)*length) {
        *length *= 2;
        string = (char*)realloc(string, *length);
    }
    string[index] = c;
}

int main() {
    home_directory = getcwd(NULL, 0);
    if (home_directory == NULL) {
        perror("getcwd() error");
        exit(EXIT_FAILURE);
    }
    oldpwd = strdup(home_directory);

    size_t input_line_size = 1024;
    char* input_line = (char* )malloc(input_line_size * sizeof(char));
    if (input_line == NULL) {
        perror("malloc() error");
        exit(EXIT_FAILURE);
    }

    int stdin_copy = dup(0);
    int stdout_copy = dup(1);

    jobs = (struct job*)malloc(max_jobs * sizeof(struct job));
    for (int i = 0; i < max_jobs; i++) {
        jobs[i].id = -1;
        jobs[i].command = NULL;
    }

    load_history();

    signal(SIGCHLD, signal_bg_end);
    signal(SIGINT, SIG_IGN);
    signal(SIGTSTP, SIG_IGN);

    char* autocmp_cmd = NULL;

    while (true) {
        char c;
        setbuf(stdout, NULL);
        enableRawMode();
        int pt = 0;
        if (autocmp_cmd != NULL) {
            strcpy(input_line, autocmp_cmd);
            input_line[strlen(autocmp_cmd)] = '\0';
            pt = strlen(input_line);
            free(autocmp_cmd);
            autocmp_cmd = NULL;
        }
        else {
            prompt();
            memset(input_line, '\0', input_line_size);
        }
        time_taken_by_last_command = 0;

        while (read(STDIN_FILENO, &c, 1) == 1) {
            if (iscntrl(c)) {
                if (c == 10) break;
                else if (c == 127) { // backspace
                    if (pt > 0) {
                        if (input_line[pt-1] == 9) {
                            for (int i = 0; i < 7; i++) {
                                printf("\b");
                            }
                        }
                        input_line[--pt] = '\0';
                        printf("\b \b");
                    }
                } else if (c == 9) { // TAB character
                    addtostring(input_line, &input_line_size, c, pt);
                    pt++;
                    break;
                } else if (c == 4) {
                    save_history("\n");
                    exit(0);
                } else {
                    printf("%d\n", c);
                }
            } else {
                addtostring(input_line, &input_line_size, c, pt);
                pt++;
                printf("%c", c);
            }
        }
        disableRawMode();
        // printf("\nInput Read: [%s]\n", input_line);

        if (strlen(input_line) == 0) {
            printf("\n");
            continue;
        }
        addtostring(input_line, &input_line_size, '\n', pt);
        pt++;

        if (input_line[pt-2] == 9) {
            input_line[pt-2] = '\0';
            pt--;
            autocmp_cmd = autocomplete(input_line);
            continue;
        }
        save_history(input_line);
        printf("\n");
        char* input_ptr = input_line;

        char* command, * background_command;
        while (command = strtok_r(input_ptr, ";\n", &input_ptr)) {
            while (strchr(command, '&') != NULL) {
                background_command = strtok_r(command, "&", &command);
                handle_pipes(background_command, stdin_copy, stdout_copy, stdin_copy, true);
            }
            handle_pipes(command, stdin_copy, stdout_copy, stdin_copy, false);
        }
    }

    free(input_line);
    free(oldpwd);
    free(home_directory);
    return 0;
}
