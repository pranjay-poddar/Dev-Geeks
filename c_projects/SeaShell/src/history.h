#ifndef __HISTORY_H
#define __HISTORY_H

enum {
    HISTORY_MAX = 20,
    DISPLAY_MAX = 10
};

void load_history();
void save_history();
void print_history();

#endif