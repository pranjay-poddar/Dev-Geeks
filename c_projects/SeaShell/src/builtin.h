#ifndef __BUILTIN_H
#define __BUILTIN_H

void _echo(int number_of_arguments, char* arguments[]);
void _pwd(int number_of_arguments, char* arguments[]) ;
void _cd(int number_of_arguments, char* arguments[]);
void _jobs(int number_of_arguments, char* arguments[]);
void _sig(int number_of_arguments, char* arguments[]);
void _fg(int number_of_arguments, char* arguments[]);
void _bg(int number_of_arguments, char* arguments[]);

#endif