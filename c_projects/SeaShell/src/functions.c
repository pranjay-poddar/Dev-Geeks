#include "headers.h"
#include "functions.h"

extern char* home_directory;

enum {
    MAX_PATH_SIZE = 1024,
    BUFFER_SIZE = 1024
};

void pinfo(int number_of_arguments, char* arguments[]) {
    if (number_of_arguments > 2) {
        fprintf(stderr,"pinfo: too many arguments\n");
        return;
    }

    int pid = getpid();
    if (number_of_arguments == 1) {
        pid = atoi(arguments[0]);
    }

    char path[MAX_PATH_SIZE];
    sprintf(path, "/proc/%d/stat", pid);

    long long fd = open(path, O_RDONLY);
    if (fd < 0) {
        perror("Invalid PID");
        return;
    }
    char* buffer = (char*)malloc(BUFFER_SIZE);
    long long bytes = read(fd, buffer, BUFFER_SIZE);
    if (bytes < 0) {
        perror(path);
        return;
    }
    close(fd);

    char* word;
    int i = 0;
    printf("pid: %d\n", pid);
    char* pid_string;
    char* status;
    char* memory;
    bool foreground = false; 
    while ((word = strtok_r(buffer, " ", &buffer))) {
        if (i == 0) {
            pid_string = strdup(word);
        }
        if (i == 2) {
            status = strdup(word);
        }
        else if (i == 7) {
            if (strcmp(word, pid_string) == 0) {
                foreground = true;
            }
        }
        else if (i == 22) {
            memory = strdup(word);
        }
        else if (i > 22) {
            break;
        }
        i++;
    }

    printf("process status: %s%c\n", status, foreground ? '+' : ' ');
    printf("memory: %s\n", memory);
    sprintf(path, "/proc/%d/exe", (int)pid);
    char exe_path[MAX_PATH_SIZE];

    int len = readlink(path, exe_path, MAX_PATH_SIZE);
    if (len < 0) {
        perror("Invalid PID");
        return;
    }
    exe_path[len] = '\0';
    if (strstr(exe_path, home_directory) != NULL) {
        printf("executable path: ~%s\n", exe_path + strlen(home_directory));;
    }
    else {
        printf("executable path: %s\n", exe_path);
    }
}

void recurse_directory(char* directory, bool d_flag, bool f_flag, char* file_name) {
    char* base;
    if (strlen(directory) > 1 && directory[strlen(directory) - 1] == '/') {
        directory[strlen(directory) - 1] = '\0';
    }
    if (strlen(directory) > 1) {
        base = strchr(directory, '/');
        if (base == NULL) base = directory;
        else base++;
    }

    if (d_flag && (file_name == NULL || strcmp(base, file_name) == 0)) {
        printf("%s\n", directory);
    }

    DIR* d = opendir(directory);
    if (!d) perror("opendir");
    struct stat st;

    char* item;
    struct dirent* dir;
    while ((dir = readdir(d)) != NULL) {
        item = dir->d_name;
        char* path = (char*)malloc(strlen(directory) + strlen(item) + 2);
        strcpy(path, directory);
        strcat(path, "/");
        strcat(path, item);

        if (stat(path, &st) == -1) {
            if (f_flag && (file_name == NULL || strcmp(item, file_name) == 0)) {
                printf("%s/%s\n", directory, item);
            }
            continue;
        }
        if (S_ISDIR(st.st_mode) == 1) {
            if (item[0] == '.') continue;
            recurse_directory(path, d_flag, f_flag, file_name);
        }
        else if (f_flag && (file_name == NULL || strcmp(item, file_name) == 0)) {
            printf("%s\n", path);
        }
        free(path);
    }
    closedir(d);
}

void discover(int number_of_arguments, char* arguments[]) {
    // Parsing flags
    bool d_flag = false;
    bool f_flag = false;
    for (int i = 0; i < number_of_arguments; i++) {
        if (arguments[i][0] != '-') continue;
        if (strlen(arguments[i]) == 1) {
            fprintf(stderr,"ls: invalid option -- '%s'\n", arguments[i]);
            return;
        }
        for (int j = 1; j < strlen(arguments[i]); j++) {
            if (arguments[i][j] == 'd') {
                d_flag = true;
            }
            else if (arguments[i][j] == 'f') {
                f_flag = true;
            }
            else {
                fprintf(stderr,"ls: invalid option -- '%c'\n", arguments[i][j]);
                return;
            }
        }
    }
    if (!d_flag && !f_flag) {
        d_flag = true;
        f_flag = true;
    }

    // Displaying all incorrect arguments and storing valid arguments
    char* file_name = NULL;
    for (int i = 0; i < number_of_arguments; i++) {
        if (arguments[i][0] == '-') continue;

        struct stat st;

        // Replacing ~ with home directory    
        if (arguments[i][0] == '~') {
            char* temp = arguments[i];
            arguments[i] = (char*)malloc(strlen(home_directory) + strlen(temp));
            strcpy(arguments[i], home_directory);
            strcat(arguments[i], temp + 1);
            free(temp);
        }

        if (arguments[i][0] == '"') {
            if (file_name != NULL) {
                fprintf(stderr,"Multiple file names provided. Please provide only one file name\n");
                return;
            }
            file_name = arguments[i];
        }
        else if (stat(arguments[i], &st) == -1) {
            fprintf(stderr,"discover: cannot access '%s': No such directory\n", arguments[i]);
        }
    }
    if (file_name != NULL && strlen(file_name) > 1) {
        file_name = file_name + 1;
        file_name[strlen(file_name) - 1] = '\0';
    }

    // Calling recurse function for all arguments
    int count = 0;
    for (int i = 0; i < number_of_arguments; i++) {
        if (arguments[i][0] == '-' || arguments[i][0] == '"') continue;

        count++;
        struct stat st;
        if (stat(arguments[i], &st) == -1) {
            continue;
        }

        if (S_ISDIR(st.st_mode) == 1) {
            recurse_directory(arguments[i], d_flag, f_flag, file_name);
        }
        else {
            fprintf(stderr,"Invalid target directory %s\n", arguments[i]);
        }
    }
    if (count == 0) {
        recurse_directory(".", d_flag, f_flag, file_name);
    }
}