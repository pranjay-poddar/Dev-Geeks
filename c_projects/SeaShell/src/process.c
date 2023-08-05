#include "process.h"
#include "execute.h"
#include "headers.h"

void handle_pipes(char* command, int input_fd, int stdout_copy, int stdin_copy, bool background) {
    char* curr;
    char* prev;
    char* dup_command = strdup(command);

    // If there is no pipe,
    if (strchr(command, '|') == NULL) {
        dup2(input_fd, 0);
        dup2(stdout_copy, 1);
        process(command, background);
        dup2(stdin_copy, 0);
        dup2(stdout_copy, 1);
        return;
    }

    // If there is a pipe,
    int pipe_fd[2];

    curr = strtok_r(dup_command, "|", &dup_command);
    if (curr == NULL) {
        return;
    }
    pipe(pipe_fd);
    int pid = fork();

    if (pid == 0) {
        dup2(input_fd, STDIN_FILENO);
        dup2(pipe_fd[1], STDOUT_FILENO);
        close(pipe_fd[0]);
        close(pipe_fd[1]);
        process(curr, background);
        exit(0);
    }

    close(pipe_fd[1]);
    handle_pipes(dup_command, pipe_fd[0], stdout_copy, stdin_copy, background);

    close(pipe_fd[0]);
    waitpid(pid, NULL, 0);

    dup2(stdin_copy, 0);
    dup2(stdout_copy, 1);
}

void process(char* command, bool background) {

    if (command == NULL) {
        return;
    }

    char* token;
    char* word;
    token = strtok_r(command, " \t\n", &command);
    if (token == NULL) {
        return;
    }

    char* dup_command = strdup(command);
    char* command_ptr = dup_command;
    int number_of_arguments = 0;
    while (word = strtok_r(dup_command, " \t\n", &dup_command)) {
        number_of_arguments++;
    }
    free(command_ptr);

    char* arguments[number_of_arguments];
    int i = 0;
    while (word = strtok_r(command, " \t\n", &command)) {
        arguments[i] = strdup(word);
        i++;
    }




    int input_redirection = -1;
    int output_redirection = -1;
    int append_redirection = -1;

    int input_fd = -1, output_fd = -1;

    int stdout_copy = dup(1);
    int stdin_copy = dup(0);

    for (int i = 0; i < number_of_arguments; i++) {
        if (strcmp(arguments[i], "<") == 0) {
            input_redirection = i;
        }
    }

    if (input_redirection != -1) {
        if (input_redirection == number_of_arguments - 1) {
            fprintf(stderr, "No input file specified\n");
            return;
        }
        input_fd = open(arguments[input_redirection + 1], O_RDONLY);
        if (input_fd == -1) {
            perror(arguments[input_redirection + 1]);
            return;
        }

        for (int i = input_redirection; i < number_of_arguments - 2; i++) {
            free(arguments[i]);
            arguments[i] = strdup(arguments[i + 2]);
        }
        number_of_arguments -= 2;
    }

    for (int i = 0; i < number_of_arguments; i++) {
        if (strcmp(arguments[i], ">") == 0) {
            output_redirection = i;
        }

        if (strcmp(arguments[i], ">>") == 0) {
            output_redirection = i;
            append_redirection = 1;
        }
    }


    if (output_redirection != -1) {
        if (output_redirection == number_of_arguments - 1) {
            fprintf(stderr, "No output file specified\n");
            return;
        }

        if (append_redirection != 1) {
            output_fd = open(arguments[output_redirection + 1], O_WRONLY | O_CREAT | O_TRUNC, 0644);
        }
        else {
            output_fd = open(arguments[output_redirection + 1], O_WRONLY | O_CREAT | O_APPEND, 0644);
        }
        if (output_fd == -1) {
            perror(arguments[output_redirection + 1]);
            return;
        }

        for (int i = output_redirection; i < number_of_arguments - 2; i++) {
            free(arguments[i]);
            arguments[i] = strdup(arguments[i + 2]);
        }
        number_of_arguments -= 2;
    }

    // printf("Input File: %d\n", input_fd);
    // printf("Output File: %d\n", output_fd);

    if (input_fd != -1) {
        dup2(input_fd, 0);
    }

    if (output_fd != -1) {
        dup2(output_fd, 1);
    }





    execute(token, number_of_arguments, arguments, background);

    for (int i = 0; i < number_of_arguments; i++) {
        free(arguments[i]);
    }
    free(word);
}