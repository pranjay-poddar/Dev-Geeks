#include "prompt.h"
#include "headers.h"

extern char* home_directory;
extern time_t time_taken_by_last_command;

enum {
    MAX_HOSTNAME_SIZE = 256
};

void prompt() {
    char hostname[MAX_HOSTNAME_SIZE];
    int ret = gethostname(&hostname[0], MAX_HOSTNAME_SIZE);
    if (ret == -1) {
        perror("gethostname");
        exit(EXIT_FAILURE);
    }

    struct passwd* pws;
    pws = getpwuid(geteuid());

    char* cwd = getcwd(NULL, 0);
    if (cwd == NULL) {
        perror("getcwd");
        exit(EXIT_FAILURE);
    }

    char* display_cwd = cwd;
    if (strncmp(cwd, home_directory, strlen(home_directory)) == 0) {
        cwd[strlen(home_directory)-1] = '~';
        display_cwd = &cwd[strlen(home_directory)-1];
    }
    printf(GREEN);
    printf("<%s@%s:", pws->pw_name, hostname);
    printf(BLUE);
    printf("%s", display_cwd);
    printf(MAGENTA);
    if (time_taken_by_last_command >= 1) {
        printf(" (took %ld seconds)", time_taken_by_last_command);
    }
    printf(GREEN);
    printf("> ");
    printf(RESET);
    free(cwd);
}
