#ifndef __COMMAND_H
#define __COMMAND_H

#include <stdbool.h>
void handle_pipes(char* command, int input_fd, int stdout_copy, int stdin_copy, bool background);
void process(char *command, bool background);

#endif