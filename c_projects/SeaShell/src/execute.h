#ifndef __EXECUTE_H
#define __EXECUTE_H

#include <stdbool.h>
void signal_bg_end();
void execute(char* function, int number_of_arguments, char* arguments[], bool background);

#endif