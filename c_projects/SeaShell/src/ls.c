#include "headers.h"
#include "ls.h"

extern char* home_directory;

struct passwd* pw;
struct group* gr;

void sort(int* indexes, int n, char* arguments[]) {
    for (int i = 0; i < n - 1; i++) {
        int min_index = i;
        for (int j = i + 1; j < n; j++) {

            // To sort on the basis of base name and not path
            char* name1 = arguments[indexes[j]];
            char* name2 = arguments[indexes[min_index]];

            char* base1 = strlen(name1) > 1 ? name1 + strlen(name1) - 2 : name1;
            while (base1 != name1 && *base1 != '/') base1--;
            if (*base1 == '/' && strlen(name1) > 1) base1++;

            char* base2 = strlen(name2) > 1 ? name2 + strlen(name2) - 2 : name2;
            while (base2 != name2 && *base2 != '/') base2--;
            if (*base2 == '/' && strlen(name2) > 1) base2++;

            if (strcasecmp(base1, base2) < 0)
                min_index = j;
        }
        int temp = indexes[i];
        indexes[i] = indexes[min_index];
        indexes[min_index] = temp;
    }
}

int compare(const void* a, const void* b) {
    return strcasecmp(*(char**)a, *(char**)b);
}

void _ls_dir(char* directory, bool a_flag, bool l_flag) {

    DIR* d = opendir(directory);
    if (!d) perror("opendir");

    int count = 0;
    struct dirent* dir;
    while ((dir = readdir(d)) != NULL)
        count++;
    closedir(d);

    char* items[count];
    d = opendir(directory);
    if (!d) perror("opendir");

    long long total_blocks = 0;
    for (int i = 0; i < count; i++) {
        dir = readdir(d);
        items[i] = strdup(dir->d_name);

        if (items[i][0] != '.' || a_flag) {
            char path[strlen(directory) + strlen(items[i]) + 2];
            strcpy(path, directory);
            if (directory[strlen(directory) - 1] != '/')
                strcat(path, "/");
            struct stat st;
            strcat(path, items[i]);stat(path, &st);
            total_blocks += st.st_blocks;
        }
    }
    closedir(d);

    if (l_flag) {
        printf("total %lld\n", total_blocks/2);
    }

    qsort(items, count, sizeof(char*), compare);
    for (int i = 0; i < count; i++) {
        if (items[i][0] == '.' && !a_flag) continue;
        char path[strlen(directory) + strlen(items[i]) + 2];
        strcpy(path, directory);
        if (directory[strlen(directory) - 1] != '/')
            strcat(path, "/");
        strcat(path, items[i]);
        display(path, items[i], l_flag);
    }
}

void display_short(char* path, char* name) {
    // colour coding file based on file type
    struct stat fileStat;
    if (stat(path, &fileStat) < 0) {
        perror(path);
        return;
    }

    if (S_ISDIR(fileStat.st_mode)) {
        printf(BLUE);
    }
    else if (fileStat.st_mode & S_IXUSR) {
        printf(GREEN);
    }
    else if (S_ISLNK(fileStat.st_mode)) {
        printf(CYAN);
    }
    else {
        printf(WHITE);
    }

    if (name == NULL)
        printf("%s\n", path);
    else
        printf("%s\n", name);
    printf(RESET);
    return;
}

void display(char* path, char* name, bool l_flag) {
    if (!l_flag) {
        display_short(path, name);
        return;
    }

    struct stat fileStat;
    if (stat(path, &fileStat) < 0) {
        perror(path);
        return;
    }

    printf((S_ISDIR(fileStat.st_mode)) ? "d" : "-");
    printf((fileStat.st_mode & S_IRUSR) ? "r" : "-");
    printf((fileStat.st_mode & S_IWUSR) ? "w" : "-");
    printf((fileStat.st_mode & S_IXUSR) ? "x" : "-");
    printf((fileStat.st_mode & S_IRGRP) ? "r" : "-");
    printf((fileStat.st_mode & S_IWGRP) ? "w" : "-");
    printf((fileStat.st_mode & S_IXGRP) ? "x" : "-");
    printf((fileStat.st_mode & S_IROTH) ? "r" : "-");
    printf((fileStat.st_mode & S_IWOTH) ? "w" : "-");
    printf((fileStat.st_mode & S_IXOTH) ? "x" : "-");
    printf(" ");

    printf("%2ld ", fileStat.st_nlink);

    pw = getpwuid(fileStat.st_uid);
    gr = getgrgid(fileStat.st_gid);
    printf("%s %s ", pw->pw_name, gr->gr_name);

    printf("%5ld ", fileStat.st_size);

    char date[100];
    strftime(date, 100, "%b %d %H:%M", localtime(&fileStat.st_mtime));
    printf("%s ", date);

    display_short(path, name);
}

void _ls(int number_of_arguments, char* arguments[]) {

    // Parsing Flags
    bool a_flag = false;
    bool l_flag = false;
    for (int i = 0; i < number_of_arguments; i++) {
        if (arguments[i][0] != '-') continue;
        if (strlen(arguments[i]) == 1) {
            fprintf(stderr,"ls: invalid option -- '%s'\n", arguments[i]);
            return;
        }
        for (int j = 1; j < strlen(arguments[i]); j++) {
            if (arguments[i][j] == 'a') {
                a_flag = true;
            }
            else if (arguments[i][j] == 'l') {
                l_flag = true;
            }
            else {
                fprintf(stderr,"ls: invalid option -- '%c'\n", arguments[i][j]);
                return;
            }
        }
    }

    // Counting number of files and directories
    int number_of_files = 0;
    int number_of_directories = 0;
    int number_of_invalid = 0;

    for (int i = 0; i < number_of_arguments; i++) {
        if (arguments[i][0] == '-') continue;

        // Replacing ~ with home directory    
        if (arguments[i][0] == '~') {
            char* temp = arguments[i];
            arguments[i] = (char*)malloc(strlen(home_directory) + strlen(temp));
            strcpy(arguments[i], home_directory);
            strcat(arguments[i], temp + 1);
            free(temp);
        }
        struct stat st;
        if (stat(arguments[i], &st) == -1) {
            number_of_invalid++;
            fprintf(stderr,"ls: cannot access '%s': No such file or directory\n", arguments[i]);
            continue;
        }
        if (S_ISDIR(st.st_mode) == 1) number_of_directories++;
        else number_of_files++;
    }


    // Sorting files and directories
    int directories[number_of_directories];
    int files[number_of_files];

    int nd = 0, nf = 0;
    for (int i = 0; i < number_of_arguments; i++) {
        if (arguments[i][0] == '-') continue;
        struct stat st;
        if (stat(arguments[i], &st) == -1) continue;

        if (S_ISDIR(st.st_mode) == 1) directories[nd++] = i;
        else files[nf++] = i;
    }
    sort(directories, number_of_directories, arguments);
    sort(files, number_of_files, arguments);


    if (number_of_files + number_of_directories + number_of_invalid == 0) {
        _ls_dir(".", a_flag, l_flag);
        return;
    }

    // Printing files
    for (int i = 0; i < number_of_files; i++) {
        display(arguments[files[i]], NULL, l_flag);
    }
    if (number_of_files > 0 && number_of_directories > 0)
        printf("\n");


    // Printing directories
    bool display_dir_name = (number_of_directories + number_of_files + number_of_invalid) > 1;
    for (int i = 0; i < number_of_directories; i++) {
        if (display_dir_name)
            printf("%s:\n", arguments[directories[i]]);
        _ls_dir(arguments[directories[i]], a_flag, l_flag);
        if (i != number_of_directories - 1)
            printf("\n");
    }
}