
## Starting 

1. Install Node.js: You need to have npm installed in your computer for this problem. It comes with Node.js and you can get it by installing Node from https://nodejs.org/en/

2. You are expected to write the code in `task.js` file.

3. Once you are done with the changes you should be able to execute the task app by running the following command from the terminal.

   **On Windows:**

   ```
   .\task.bat
   ```

   **On \*nix:**

   ```
   ./task.sh
   ```
## Running Automated Tests

### 1. Install Node.js

You need to have npm installed in your computer for this problem. It comes with Node.js and you can get it by installing Node from https://nodejs.org/en/

### 2. Install dependencies

Run `npm install` to install all dependencies.

### 3. Create Create symbolic link to the executable file

#### On Windows

To create a symbolic link on Windows, you'll need to run either the Windows Command Prompt, or Windows Powershell **with administrator privileges**. To do so, right-click on the icon for Command Prompt, or Powershell, and choose the _"Run as Administrator"_ option.

**Command Prompt:**

```
> mklink task task.bat
```

**Powershell:**

```
> cmd /c mklink task task.bat
```

#### On \*nix:

Run the following command in your shell:

```
$ ln -s task.sh task
```

### 4. Try running tests.

Now run `npm test` and you will see all the tests failing. As you fill in each functionality, you can re-run the tests to see them passing one by one.

## A Note about `/` for Windows Users

In the following sections, you'll see many commands prefixed with `./`, or paths containing the `/` (forward-slash) character.

If you're using the Windows _Command Prompt_, then you'll need to replace `/` with `\` (back-slash) for these commands and paths to work as expected.

On Windows _Powershell_, these substitutions are not required.



## Specification

1. The app can be run in the console with `./task`.

2. The app should read from and write to a task.txt text file. Each task occupies a single line in this file. Each line in the file should be in this format :

   ```
   p task
   ```

   where `p` is the priority ( priority will be a number) and `task` is the task description.

   > Priority denotes how important a task is, if it is a high priority task, it should be completed earlier. Priority is denoted using an integer, the lower the number, the higher the priority.

   Here is an example file that has 2 items.

   ```
   1 Buy milk
   2 Complete the project
   ```

3. Completed task are writted to a completed.txt file. Each task occupies a single line in this file. Each line in the file should be in this format :

   ```
   task
   ```

   where task is the task description.

   Here is an example file that has 2 items.

   ```
   Buy milk
   Complete the project
   ```

4. Priority can be any integer _greater than_ or _equal to_ 0. 0 being the highest priority

5. If two task have the same priority, the task that was added first should be displayed first.

   The application must open the files task.txt and completed.txt from where the app is run, and not where the app is located. For example, if we invoke the app like this:

6. The files should always be sorted in order of the priority, ie, the task with the highest priority should be first item in the file.

   ```
   $ cd /path/to/plans

   $ /path/to/apps/task ls
   ```

   The application should look for the text files in `/path/to/plans`, since that is the user’s current directory.
   
> Please note that the programming task could be completed without the use of any additional packages

## Usage

### 1. Help

Executing the command without any arguments, or with a single argument help prints the CLI usage.

```
$ ./task help
Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics
```

### 2. List all pending items

Use the ls command to see all the items that are not yet complete, in ascending order of priority.

Every item should be printed on a new line. with the following format

```
[index] [task] [priority]
```

Example:

```
$ ./task ls
1. change light bulb [2]
2. water the plants [5]
```

index starts from 1, this is used to identify a particular task to complete or delete it.

### 3. Add a new item

Use the add command. The text of the task should be enclosed within double quotes (otherwise only the first word is considered as the item text, and the remaining words are treated as different arguments).

```
$ ./task add 5 "the thing i need to do"
Added task: "the thing i need to do" with priority 5
```

### 4. Delete an item

Use the del command to remove an item by its index.

```
$ ./task del 3
Deleted item with index 3
```

Attempting to delete a non-existent item should display an error message.

```
$ ./task del 5
Error: item with index 5 does not exist. Nothing deleted.
```

### 5. Mark a task as completed

Use the done command to mark an item as completed by its index.

```
$ ./task done 1
Marked item as done.
```

Attempting to mark a non-existed item as completed will display an error message.

```
$ ./task done 5
Error: no incomplete item with index 5 exists.
```

### 6. Generate a report

Show the number of complete and incomplete items in the list. and the complete and incomplete items grouped together.

```
$ ./task report
Pending : 2
1. this is a pending task [1]
2. this is a pending task with priority [4]

Completed : 3
1. completed task
2. another completed task
3. yet another completed task
```
