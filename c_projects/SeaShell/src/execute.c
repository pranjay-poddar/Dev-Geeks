#include "execute.h"
#include "builtin.h"
#include "ls.h"
#include "headers.h"
#include "functions.h"
#include "history.h"
#include "prompt.h"

extern time_t time_taken_by_last_command;
extern struct job* jobs;

char* join_arguments(int number_of_arguments, char* arguments[]) {
    int max_size = 1024;
    char* joined_arguments = malloc(max_size * sizeof(char));
    int total_length = 0;
    joined_arguments[0] = '\0';
    for (int i = 0; i < number_of_arguments; i++) {
        total_length += strlen(arguments[i]);
        if (total_length - 5 > max_size) {
            max_size *= 2;
            joined_arguments = realloc(joined_arguments, max_size * sizeof(char));
        }

        strcat(joined_arguments, arguments[i]);
        if (i != number_of_arguments - 1) {
            strcat(joined_arguments, " ");
        }
    }
    strcat(joined_arguments, "\0");

    return joined_arguments;
}

// Executes external foreground or background processes
void execute_external(char* function, char* parameter[], bool background, int number_of_arguments) {
    int id = fork();
    time_t start = time(NULL);
    if (id == 0) {
        setpgid(0, 0);
        signal(SIGINT, SIG_DFL);
        signal(SIGTSTP, SIG_DFL);
        execvp(function, parameter);
        fprintf(stderr,"Command not found: %s\n", function);
        exit(0);
    }
    else {
        if (!background) {
            if (id == -1) return;
            signal(SIGTTOU, SIG_IGN);
            signal(SIGTTIN, SIG_IGN);
            int temp = tcgetpgrp(STDIN_FILENO);
            tcsetpgrp(0, id);

            int status;
            waitpid(id, &status, WUNTRACED);
            time_t end = time(NULL);
            time_taken_by_last_command += end - start;

            if (WIFSTOPPED(status)) {
                int i;
                for (i = 0; i < max_jobs; i++) {
                    if (jobs[i].id == -1) {
                        jobs[i].id = id;
                        jobs[i].command = join_arguments(number_of_arguments, parameter);
                        break;
                    }
                }
                if (i == max_jobs) {
                    fprintf(stderr, "Number of jobs exceeded the limit, job terminated\n");
                    kill(id, SIGKILL);
                }
            }

            tcsetpgrp(0, temp);
            signal(SIGTTOU, SIG_DFL);
            signal(SIGTTIN, SIG_DFL);
        }
        else {
            int i;
            for (i = 0; i < max_jobs; i++) {
                if (jobs[i].id == -1) {
                    jobs[i].id = id;
                    jobs[i].command = join_arguments(number_of_arguments, parameter);
                    break;
                }
            }
            if (i == max_jobs) {
                fprintf(stderr,"Number of jobs exceeded the limit, job terminated\n");
                kill(id, SIGKILL);
                return;
            }
            printf("[%d] %d\n", i+1, id);
        }
    }
}

// signal the end of background processes
void signal_bg_end() {
    for (int i = 0; i < max_jobs; i++) {
        if (jobs[i].id != -1) {
            int status;
            int id = waitpid(jobs[i].id, &status, WNOHANG);
            if (id != 0) {
                if (WIFEXITED(status)) {
                    printf("\n[%d] %s with pid %d exited normally\n", i+1, jobs[i].command, jobs[i].id);
                }
                else {
                    printf("\n[%d] %s with pid %d exited abnormally\n", i+1, jobs[i].command, jobs[i].id);
                }
                jobs[i].id = -1;
                free(jobs[i].command);
                jobs[i].command = NULL;
                prompt();
                fflush(stdout);
            }
        }
    }
}

// Checks if function is a builtin or external function and executes it
void execute(char* function, int number_of_arguments, char* arguments[], bool background) {
    
    if (strcmp(function, "exit") == 0) {
        save_history("\n");
        exit(0);
    }
    else if (strcmp(function, "echo") == 0) {
        _echo(number_of_arguments, arguments);
    }
    else if (strcmp(function, "pwd") == 0) {
        _pwd(number_of_arguments, arguments);
    }
    else if (strcmp(function, "cd") == 0) {
        _cd(number_of_arguments, arguments);
    }
    else if (strcmp(function, "ls") == 0) {
        _ls(number_of_arguments, arguments);
    }
    else if (strcmp(function, "pinfo") == 0) {
        pinfo(number_of_arguments, arguments);
    }
    else if (strcmp(function, "discover") == 0) {
        discover(number_of_arguments, arguments);
    }
    else if (strcmp(function, "history") == 0) {
        print_history(number_of_arguments, arguments);
    }
    else if (strcmp(function, "jobs") == 0) {
        _jobs(number_of_arguments, arguments);
    }
    else if (strcmp(function, "sig") == 0) {
        _sig(number_of_arguments, arguments);
    }
    else if (strcmp(function, "fg") == 0) {
        _fg(number_of_arguments, arguments);
    }
    else if (strcmp(function, "bg") == 0) {
        _bg(number_of_arguments, arguments);
    }
    else {
        char* parameter[number_of_arguments + 2];
        parameter[0] = function;
        for (int i = 0; i < number_of_arguments; i++) {
            parameter[i + 1] = arguments[i];
        }
        parameter[number_of_arguments + 1] = NULL;
        execute_external(function, parameter, background, number_of_arguments+1);
    }
}