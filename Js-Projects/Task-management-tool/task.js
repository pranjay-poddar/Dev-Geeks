const fs = require('fs');
let task_file_path = './task.txt';
let completed_file_path = './completed.txt';

let command = process.argv[2];
let number = process.argv[3];
let text = process.argv[4];

const init = () => {
    if(!fs.existsSync(task_file_path)){
        setTaskData({tasks: []});
    }
    if(!fs.existsSync(completed_file_path)){
        setCompletedData({completed: []});
    }
};

const setTaskData = (data) => {
    fs.writeFileSync(task_file_path,JSON.stringify(data));
}

const setCompletedData = (data) => {
    fs.writeFileSync(completed_file_path,JSON.stringify(data));
}

const getTaskData = () => {
    let fileContents = fs.readFileSync(task_file_path,
      {encoding:'utf8', flag:'r'});
    return JSON.parse(fileContents);
}

const getCompletedData = () => {
    const fileContents = fs.readFileSync(completed_file_path,
      {encoding:'utf8', flag:'r'});
    return JSON.parse(fileContents);
}

const help = () => {
    console.log(`Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`);
}

const add = (priority, task) => {
    if(!task){
        console.log("Error: Missing tasks string. Nothing added!");
        return;
    }
    let taskData = getTaskData();

    let updatedData = []
    if(taskData){
        updatedData = taskData.tasks.map((taskElement) =>{
            if(taskElement.priority == priority) {
                return {"priority":taskElement.priority+1, "task":taskElement.task}
            }else {
                return {"priority":`${taskElement.priority}`, "task":taskElement.task}
            }
        })
    }
   

    updatedTask = {"tasks": updatedData}
    updatedTask.tasks.push({priority: priority, task:task});
    setTaskData(updatedTask);
    console.log(`Added task: "${task}" with priority ${priority}`);
}

const list = () => {
    const taskData = getTaskData();
    let i=taskData.tasks.length;
    let j=0;
    if(i===0) {
        console.log(`There are no pending tasks!`);
        return;
    }
    taskData.tasks.forEach(task => {
        console.log(`${++j}. ${task.task} [${task.priority}]`);
    });
}

const del = (index) => {
    if(!index) {
        console.log(`Error: Missing NUMBER for deleting tasks.`);
        return;
    }
    let taskData = getTaskData();
    if(index === '0' || index>taskData.tasks.length) {
        console.log(`Error: task with index #${index} does not exist. Nothing deleted.`);
        return;
    }
    taskData.tasks.splice(index-1, 1);
    setTaskData(taskData);
    console.log(`Deleted task #${index}`);
};

const done = (index) => {
    if(!index) {
        console.log(`Error: Missing NUMBER for marking tasks as done.`);
        return;
    }
    let taskData = getTaskData();
    if(index === '0' || index>taskData.tasks.length) {
        console.log(`Error: no incomplete item with index #${index} exists.`);
        return;
    }
    let completedData = taskData.tasks.splice(index-1, 1);
    setTaskData(taskData);
    taskData = getCompletedData();
    taskData.completed.push(completedData[0]);
    setCompletedData(taskData);
    console.log(`Marked item as done.`);
}

const report = () => {
    let completedData = getCompletedData();
    let taskData = getTaskData();
    let pedingTask=taskData.tasks.length;
    let completedTask=completedData.completed.length;

    console.log(`Pending : ${pedingTask}`);
    taskData.tasks.forEach((task,index) => {
        console.log(`${++index}. ${task.task} [${task.priority}]`);
    });
    console.log(`\nCompleted : ${completedTask}`);
    completedData.completed.forEach((task,index) => {
        console.log(`${++index}. ${task.task}`);
    });
  }

init();

switch(command){
    case undefined:
        help();
        break;
    case "ls":
        list();
        break;
    case "add":
        add(number, text);
        break;
    case "done":
        done(number);
        break;
    case "del":
        del(number);
        break;
    case "report":
        report();
        break;
    case "help":
          help();
          break;
    default:
        console.log("Command not found!");
        break;
}