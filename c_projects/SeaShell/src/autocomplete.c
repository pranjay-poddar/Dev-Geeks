#include "autocomplete.h"
#include "headers.h"
#include "prompt.h"

char* autocomplete(char* command) {
    char* dup_command = strdup(command);
    char* token;
    char* last_token;
    while (token = strtok_r(dup_command, ";\n&><", &dup_command)) {
        if (token == NULL) {
            break;
        }
        last_token = token;
    }
    
    char* last_token_dup = strdup(last_token);
    char* word;
    char* last_word;
    while (word = strtok_r(last_token_dup, " \t", &last_token_dup)) {
        if (word == NULL) {
            break;
        }
        last_word = word;
    }

    // Reading all the files in the current directory
    DIR* dir = opendir(".");
    if (!dir) {
        perror("opendir");
        return NULL;
    }

    char* common_prefix = NULL;
    struct dirent* entry;
    int matches = 0;
    while (entry = readdir(dir)) {
        if (!entry) {
            perror("readdir");
            return NULL;
        }
        char item[strlen(entry->d_name) + 2];
        strcpy(item, entry->d_name);
        if (entry->d_type == DT_DIR) {
            strcat(item, "/");
        }
        item[strlen(item)] = '\0';
        if (strstr(item, last_word) == item) {
            matches++;
            if (matches == 2) {
                printf("\n%s\n", common_prefix);
            }
            if (matches > 1) {
                printf("%s\n", item);
            }

            if (common_prefix == NULL) {
                common_prefix = strdup(item);
            } else {
                int i = 0;
                while (common_prefix[i] != '\0' && item[i] != '\0' && common_prefix[i] == item[i]) {
                    i++;
                }
                common_prefix[i] = '\0';
            }
        }
    }

    if (matches == 1) {
        printf("%s", &common_prefix[strlen(last_word)]);
        char* new_command = (char*)malloc(strlen(command) + strlen(&common_prefix[strlen(last_word)]) + 1);
        strcpy(new_command, command);
        strcat(new_command, &common_prefix[strlen(last_word)]);
        return new_command;
    }

    if (matches == 0) {
        return strdup(command);
    }

    prompt();
    char* new_command = (char*)malloc(strlen(command) + strlen(common_prefix) + 1);
    strcpy(new_command, command);
    strcat(new_command, &common_prefix[strlen(last_word)]);
    printf("%s", new_command);
    return new_command;
}