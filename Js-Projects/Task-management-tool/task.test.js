const fs = require("fs");
const { execSync } = require("child_process");

let deleteFile = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (err) {}
};

beforeEach(() => {
  deleteFile(`${__dirname}/task.txt`);
  deleteFile(`${__dirname}/completed.txt`);
});

let tasksTxtCli = (...args) => [`${__dirname}/task`, ...args].join(" ");

let usage = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`;

test("prints help when no additional args are provided", () => {
  let received = execSync(tasksTxtCli()).toString("utf8");

  expect(received).toEqual(expect.stringContaining(usage));
});

test("prints help", () => {
  let received = execSync(tasksTxtCli("help")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(usage));
});

test("add a single tasks", () => {
  let expected = 'Added task: "the thing i need to do" with priority 1';
  let received = execSync(
    tasksTxtCli("add", '1 "the thing i need to do"')
  ).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("show error message when add is not followed by a tasks", () => {
  let expected = "Error: Missing tasks string. Nothing added!";
  let received = execSync(tasksTxtCli("add")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("add multiple tasks", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];

  tasks.forEach((tasks, i) => {
    let expected = `Added task: "${tasks}"`;
    let received = execSync(tasksTxtCli("add", `${i + 1} "${tasks}"`)).toString(
      "utf8"
    );

    expect(received).toEqual(expect.stringContaining(expected));
  });
});

test("list tasks in order of priority", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) =>
    execSync(tasksTxtCli("add", `${i + 1} "${tasks}"`))
  );

  let expected = `1. the thing i need to do [1]
2. water the plants [2]
3. find needle in the haystack [3]
`;
  let received = execSync(tasksTxtCli("ls")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("list when there are no remaining tasks", () => {
  let expected = `There are no pending tasks!`;
  let received = execSync(tasksTxtCli("ls")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("delete a task", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((task, i) =>
    execSync(tasksTxtCli("add", `${i + 1} "${task}"`))
  );

  let expected = "Deleted task #2";
  let received = execSync(tasksTxtCli("del", "2")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("delete tasks numbered 3, 2 & 1", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) =>
    execSync(tasksTxtCli("add", `${i + 1} "${tasks}"`))
  );

  [3, 2, 1].forEach((n) => {
    let expected = `Deleted task #${n}`;
    let received = execSync(tasksTxtCli("del", n.toString())).toString("utf8");

    expect(received).toEqual(expect.stringContaining(expected));
  });
});

test("delete first task 3 times", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) => execSync(tasksTxtCli("add", `${i} "${tasks}"`)));

  [1, 1, 1].forEach((n) => {
    let expected = `Deleted task #${n}`;
    let received = execSync(tasksTxtCli("del", n.toString())).toString("utf8");

    expect(received).toEqual(expect.stringContaining(expected));
  });
});

test("delete non-existent tasks", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) => execSync(tasksTxtCli("add", `${i} "${tasks}"`)));

  [0, 4, 5].forEach((n) => {
    let expected = `Error: task with index #${n} does not exist. Nothing deleted.`;
    let received = execSync(tasksTxtCli("del", n.toString())).toString("utf8");

    expect(received).toEqual(expect.stringContaining(expected));
  });
});

test("delete does not have enough arguments", () => {
  let expected = "Error: Missing NUMBER for deleting tasks.";
  let received = execSync(tasksTxtCli("del")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("mark a tasks as done", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) => execSync(tasksTxtCli("add", `${i} "${tasks}"`)));

  let expected = "Marked item as done.";
  let received = execSync(tasksTxtCli("done", "2")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("mark as done a tasks which does not exist", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) => execSync(tasksTxtCli("add", `${i} "${tasks}"`)));

  let expected = "Error: no incomplete item with index #0 exists.";
  let received = execSync(tasksTxtCli("done", "0")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("mark as done without providing a tasks number", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) => execSync(tasksTxtCli("add", `${i} "${tasks}"`)));

  let expected = "Error: Missing NUMBER for marking tasks as done.";
  let received = execSync(tasksTxtCli("done")).toString("utf8");

  expect(received).toEqual(expect.stringContaining(expected));
});

test("report pending & completed tasks", () => {
  let tasks = [
    "the thing i need to do",
    "water the plants",
    "find needle in the haystack",
  ];
  tasks.forEach((tasks, i) => execSync(tasksTxtCli("add", `${i} "${tasks}"`)));

  execSync(tasksTxtCli("done", "1"));
  execSync(tasksTxtCli("done", "2"));

  let date = new Date();
  let expected = `Pending : 1\n1. water the plants [1]\n\nCompleted : 2\n1. the thing i need to do\n2. find needle in the haystack\n`;
  let received = execSync(tasksTxtCli("report")).toString("utf8");
  expect(received).toEqual(expect.stringContaining(expected));
});
