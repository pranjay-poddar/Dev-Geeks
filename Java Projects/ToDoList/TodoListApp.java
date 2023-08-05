import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// Task class representing a single task
class Task {
    private String title;
    private boolean isCompleted;

    public Task(String title) {
        this.title = title;
        this.isCompleted = false;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void markAsCompleted() {
        isCompleted = true;
    }

    @Override
    public String toString() {
        return "[" + (isCompleted ? "X" : " ") + "] " + title;
    }
}

// TodoList class representing a collection of tasks
class TodoList {
    private List<Task> tasks;

    public TodoList() {
        tasks = new ArrayList<>();
    }

    public void addTask(String title) {
        tasks.add(new Task(title));
    }

    public void removeTask(int index) {
        if (index >= 0 && index < tasks.size()) {
            tasks.remove(index);
        } else {
            System.out.println("Invalid task index!");
        }
    }

    public void displayTasks() {
        if (tasks.isEmpty()) {
            System.out.println("Todo list is empty!");
        } else {
            System.out.println("Todo List:");
            for (int i = 0; i < tasks.size(); i++) {
                System.out.println((i + 1) + ". " + tasks.get(i));
            }
        }
    }

    public void markTaskAsCompleted(int index) {
        if (index >= 0 && index < tasks.size()) {
            tasks.get(index).markAsCompleted();
        } else {
            System.out.println("Invalid task index!");
        }
    }
}

public class TodoListApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        TodoList todoList = new TodoList();

        while (true) {
            System.out.println("1. Add Task");
            System.out.println("2. Remove Task");
            System.out.println("3. Display Tasks");
            System.out.println("4. Mark Task as Completed");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline character after reading the integer

            switch (choice) {
                case 1:
                    System.out.print("Enter task title: ");
                    String title = scanner.nextLine();
                    todoList.addTask(title);
                    break;
                case 2:
                    System.out.print("Enter task index to remove: ");
                    int removeIndex = scanner.nextInt();
                    todoList.removeTask(removeIndex - 1);
                    break;
                case 3:
                    todoList.displayTasks();
                    break;
                case 4:
                    System.out.print("Enter task index to mark as completed: ");
                    int markIndex = scanner.nextInt();
                    todoList.markTaskAsCompleted(markIndex - 1);
                    break;
                case 5:
                    System.out.println("Exiting Todo List App. Goodbye!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
                    break;
            }
        }
    }
}
