#include "builtin.h"
#include "headers.h"

extern char* home_directory;
extern char* oldpwd;
extern struct job* jobs;
extern time_t time_taken_by_last_command;

enum {
    BUFFER_SIZE = 1024
};

void _echo(int number_of_arguments, char* arguments[]) {
    for (int i = 0; i < number_of_arguments; i++) {
        if (i != 0) {
            printf(" ");
        }
        printf("%s", arguments[i]);
    }
    printf("\n");
}

void _pwd(int number_of_arguments, char* arguments[]) {

    if (number_of_arguments > 0) {
        fprintf(stderr, "pwd: too many arguments\n");
        return;
    }

    printf("%s\n", getcwd(NULL, 0));
}

void _cd(int number_of_arguments, char* arguments[]) {

    if (number_of_arguments > 1) {
        fprintf(stderr, "cd: too many arguments\n");
        return;
    }

    if (number_of_arguments == 0 || strcmp(arguments[0], "~") == 0) {
        free(oldpwd);
        oldpwd = getcwd(NULL, 0);
        chdir(home_directory);
        return;
    }

    char* temp = getcwd(NULL, 0);
    if (strcmp(arguments[0], "-") == 0) {
        printf("%s\n", oldpwd);
        chdir(oldpwd);
        oldpwd = temp;
        return;
    }

    char destination[(sizeof(arguments[0]) / sizeof(char)) + strlen(home_directory)];
    if (arguments[0][0] == '~') {
        strcpy(destination, home_directory);
        strcat(destination, &arguments[0][1]);
    }
    else {
        strcpy(destination, arguments[0]);
    }

    if (chdir(destination) == -1) {
        fprintf(stderr, "cd: No such file or directory\n");
        free(temp);
        return;
    }
    free(oldpwd);
    oldpwd = temp;
}

int compare_current_jobs(const void* a, const void* b) {
    return strcmp(jobs[*(int*)a].command, jobs[*(int*)b].command);
}

void _jobs(int number_of_arguments, char* arguments[]) {
    bool r_flag = false;
    bool s_flag = false;
    for (int i = 0; i < number_of_arguments; i++) {
        if (arguments[i][0] != '-' || strlen(arguments[i]) != 2) {
            fprintf(stderr, "jobs: invalid option -- '%s'\n", arguments[i]);
            return;
        }
        if (arguments[i][1] == 'r') r_flag = true;
        else if (arguments[i][1] == 's') s_flag = true;

        else {
            fprintf(stderr, "jobs: invalid option -- '%c'\n", arguments[i][1]);
            return;
        }
    }

    if (r_flag && s_flag) {
        fprintf(stderr, "jobs: cannot use -r and -s together\n");
        return;
    }

    int count = 0;
    for (int i = 0; i < max_jobs; i++) {
        if (jobs[i].id != -1) count++;
    }

    int* current_jobs = (int*)malloc(sizeof(int) * count);
    int j = 0;
    for (int i = 0; i < max_jobs; i++) {
        if (jobs[i].id != -1) {
            current_jobs[j] = i;
            j++;
        }
    }

    qsort(current_jobs, count, sizeof(int), compare_current_jobs);

    for (int i = 0; i < count; i++) {
        // opening cat /proc/$$/status
        char status_file[100];
        sprintf(status_file, "/proc/%d/status", jobs[current_jobs[i]].id);
        FILE* status = fopen(status_file, "r");
        if (status == NULL) {
            fprintf(stderr, "jobs: cannot open status file\n");
            return;
        }

        char buffer[BUFFER_SIZE];
        char* state = NULL;
        while (fgets(buffer, BUFFER_SIZE, status) != NULL) {
            if (strncmp(buffer, "State:", 6) == 0) {
                state = strtok(buffer, " \t");
                state = strtok(NULL, " \t");
                break;
            }
        }

        if (state == NULL) {
            fprintf(stderr, "jobs: cannot read state\n");
            return;
        }

        bool stopped = (strcmp(state, "T") == 0);
        if (r_flag && stopped) continue;
        if (s_flag && !stopped) continue;

        printf("[%d] ", current_jobs[i]+1);
        if (stopped)
            printf("Stopped ");
        else
            printf("Running ");
        printf("%s [%d]\n", jobs[current_jobs[i]].command, jobs[current_jobs[i]].id);
    }
}

void _sig(int number_of_arguments, char* arguments[]) {
    if (number_of_arguments != 2) {
        fprintf(stderr, "sig: invalid number of arguments\n");
        return;
    }

    int job_number = atoi(arguments[0]);
    int signal = atoi(arguments[1]);

    if (job_number <= 0 || job_number > max_jobs || jobs[job_number-1].id == -1) {
        fprintf(stderr, "sig: invalid job number\n");
        return;
    }

    if (signal <= 0 || signal > 64) {
        fprintf(stderr, "sig: invalid signal number\n");
        return;
    }

    if (kill(jobs[job_number-1].id, signal) == -1) {
        fprintf(stderr, "sig: cannot send signal\n");
        return;
    }
}

void _fg(int number_of_arguments, char* arguments[]) {
    if (number_of_arguments != 1) {
        fprintf(stderr, "fg: invalid number of arguments\n");
        return;
    }

    int job_number = atoi(arguments[0]);
    if (job_number <= 0 || job_number > max_jobs || jobs[job_number-1].id == -1) {
        fprintf(stderr, "fg: invalid job number\n");
        return;
    }

    if (kill(jobs[job_number-1].id, SIGCONT) == -1) {
        fprintf(stderr, "job [%d] cannot be continued\n", job_number);
        return;
    }
    
    time_t start = time(NULL);
    signal(SIGTTOU, SIG_IGN);
    signal(SIGTTIN, SIG_IGN);
    int temp = tcgetpgrp(STDIN_FILENO);
    tcsetpgrp(0, jobs[job_number-1].id);

    int status;
    waitpid(jobs[job_number-1].id, &status, WUNTRACED);
    time_t end = time(NULL);
    time_taken_by_last_command += end - start;

    if (WIFSTOPPED(status)) {
        int i;
        for (i = 0; i < max_jobs; i++) {
            if (jobs[i].id == -1) {
                jobs[i].id = jobs[job_number-1].id;
                jobs[i].command = strdup(jobs[job_number-1].command);
                break;
            }
        }
        if (i == max_jobs) {
            fprintf(stderr, "Number of jobs exceeded the limit, job terminated\n");
            kill(jobs[job_number-1].id, SIGKILL);
        }
    }

    tcsetpgrp(0, temp);
    signal(SIGTTOU, SIG_DFL);
    signal(SIGTTIN, SIG_DFL);

    jobs[job_number-1].id = -1;
    free(jobs[job_number-1].command);
    jobs[job_number-1].command = NULL;
}

void _bg(int number_of_arguments, char* arguments[]) {
    if (number_of_arguments != 1) {
        fprintf(stderr, "bg: invalid number of arguments\n");
        return;
    }

    int job_number = atoi(arguments[0]);
    if (job_number <= 0 || job_number > max_jobs || jobs[job_number-1].id == -1) {
        fprintf(stderr, "bg: invalid job number\n");
        return;
    }

    if (kill(jobs[job_number-1].id, SIGCONT) == -1) {
        fprintf(stderr, "job [%d] cannot be continued\n", job_number);
        return;
    }
}