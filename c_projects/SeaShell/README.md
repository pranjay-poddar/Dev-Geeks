# Linux Shell in C

## Introduction 
A custom made user-deﬁned interactive shell program with implementations of some built in commands and the capability to start any user defined executable. Created as part of CS3.301 - Operating Systems and Networks at IIIT-H. 
Problem statements present in the two `.pdf` files.

## To compile and run the shell

- Clone this directory and `cd` into it.
- Run the command `make`.
- Run `./srujshell` to get a prompt of the form username@system_name:curr_dir
- Run any command in the shell. It can entail as many number of tabs and spaces, the shell accounts for those.
- In order to exit, you can run either exit or quit.

## Implemented features

### Built-in commands

1. `pwd` 
    - Displays the name of current working directory.
 
2. `cd [directory]`
    - Changes current working directory to the directory specified.
    
3. `echo [argument]`
    - Displays whatever is specified in [argument]
   
4. `ls`
    - Lists all the files and directories in the specified directory.
    - Variations such as `ls, ls . , ls etc` also work.
    - Also handles multiple directories as arguments. eg. `ls -l dir1 dir2 dir3`
    - Also highlights directories in blue and executable files in green.
    
5. `pinfo [pid]`
    - Displays process info such as status, memory and executable path about given pid. If no pid is mentioned, displays information of the shell. 
    
6. `discover <target_dir> <type_flags> <file_name>`
    - Searches for files in a directory hierarchy.
    
7. `jobs`
    - Prints a list of all currently running jobs along with their PID in order of their creation and also their status.
    - Gives the state of the job – Running, Sleeping, Stopped or Defunct.
    
8. `sig <jobnumber> <signalnumber>`
    - Takes the job number (assigned by your shell) of a running job and sends the signal corresponding to the signal number to that process. 
    
9. `fg <jobNumber>`
    - Brings the running or stopped background job corresponding to job number to the foreground, and changes its state to running. 
    
10. `bg <jobNumber>`
    -  Changes the state of a stopped background job to running (in the background).
    
11. `history`
    - Prints the last 10 commands if no argument specified.
  
### Background and foreground processes 
   - Shell supports '&' operator which lets a program run in background. 
   - All other commands are treated as system commands like emacs, vim etc.
   - Upon termination of a background process, the shell prints its PID and exit status.
  
### Additional features

1. `CTRL-Z` 
    - Pushes any currently running foreground job into the background, and change its state from ‘running’ to ‘stopped.
    
2. `CTRL-C`
    - Interrupts any currently running foreground job, by sending it the SIGINT signal.
    
3. `CTRL-D`
    - Logs you out of the shell.
    
4. `Autocompletion`
    - Autocompletes the file name on pressing the tab key. 
