#include "history.h"
#include "headers.h"

extern char* home_directory;
char* history_file_path;
char* history[HISTORY_MAX];

void load_history() {

    char* hf_base_name = ".history";
    history_file_path = (char*) malloc ((strlen(home_directory) + strlen(hf_base_name) + 1)*sizeof(char));

    strcpy(history_file_path, home_directory);
    strcat(history_file_path, "/");
    strcat(history_file_path, hf_base_name);

    history_file_path[strlen(history_file_path)] = '\0';

    for (int i=0; i<HISTORY_MAX; i++) {
        history[i] = NULL;
    }

    FILE* history_file = fopen(history_file_path, "r");
    if (history_file == NULL) {
        return;
    }

    char* line = NULL;
    size_t line_size = 0;
    int lines = 0;
    while (getline(&line, &line_size, history_file) != -1) {
        if (lines < HISTORY_MAX) {
            history[lines] = strdup(line);
        }
        else {
            for (int i=0; i<HISTORY_MAX-1; i++) {
                free(history[i]);
                strcpy(history[i], history[i+1]);
            }
            history[HISTORY_MAX-1] = strdup(line);
        }
        lines++;
    }

    fclose(history_file);
}

void save_history(char* command) {

    if (command == NULL || strcmp(command, "\n") == 0) return;

    int lines;
    for (lines=0; lines<HISTORY_MAX; lines++) {
        if (history[lines] == NULL) {
            break;
        }
    }

    if (lines > 0 && strcmp(history[lines-1], command) == 0) {
        return;
    }

    if (lines < HISTORY_MAX) {
        history[lines] = strdup(command);
        FILE* history_file = fopen(history_file_path, "a");
        if (history_file == NULL) {
            perror(history_file_path);
            return;
        }
        fprintf(history_file, "%s", command);
        fclose(history_file);
    }
    else {
        for (int i=0; i<HISTORY_MAX-1; i++) {
            strcpy(history[i], history[i+1]);
        }
        strcpy(history[HISTORY_MAX-1], command);
        FILE* history_file = fopen(history_file_path, "w");
        if (history_file == NULL) {
            perror(history_file_path);
            exit(EXIT_FAILURE);
        }
        for (int i=0; i<HISTORY_MAX; i++) {
            fprintf(history_file, "%s", history[i]);
        }
        fclose(history_file);
    }
}

void print_history(int number_of_arguments, char** arguments) {
    if (number_of_arguments > 1) {
        printf("history: too many arguments\n");
        return;
    }
    int lines;
    for (lines = 0; lines < HISTORY_MAX; lines++) {
        if (history[lines] == NULL) {
            break;
        }
    }
    int start = lines - DISPLAY_MAX;
    start = start > 0 ? start : 0;

    for (int i=start; i<lines; i++) {
        if (history[i] == NULL) {
            break;
        }
        printf("%s", history[i]);
    }
}