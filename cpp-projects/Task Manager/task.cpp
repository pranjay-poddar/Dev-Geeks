#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <algorithm>

// Task class represents individual tasks with a name and priority.
class Task {
public:
    Task(const std::string& name, int priority) : name(name), priority(priority) {}
    
    std::string getName() const {
        return name;
    }
    
    int getPriority() const {
        return priority;
    }
    
private:
    std::string name;
    int priority;
};

// TaskManager class manages a collection of tasks.
class TaskManager {
public:
    // Add a task to the task list.
    void addTask(const Task& task) {
        tasks.push_back(task);
    }
    
    // Remove a task by its name from the task list.
    void removeTask(const std::string& taskName) {
        tasks.erase(std::remove_if(tasks.begin(), tasks.end(),
                      [taskName](const Task& task) { return task.getName() == taskName; }),
                      tasks.end());
    }
    
    // Display all tasks in the task list.
    void displayTasks() const {
        if (tasks.empty()) {
            std::cout << "Task Manager - No tasks found.\n";
            return;
        }

        std::cout << "Task Manager - Current Tasks:\n";
        for (const auto& task : tasks) {
            std::cout << "Name: " << task.getName() << ", Priority: " << task.getPriority() << std::endl;
        }
    }
    
    // Sort tasks in descending order of priority.
    void sortByPriority() {
        std::sort(tasks.begin(), tasks.end(), [](const Task& a, const Task& b) {
            return a.getPriority() > b.getPriority();
        });
    }
    
    // Check if the task list is empty.
    bool isEmpty() const {
        return tasks.empty();
    }
    
    // Save tasks to a text file.
    void saveTasksToFile(const std::string& filename) const {
        std::ofstream outputFile(filename);
        if (!outputFile) {
            std::cerr << "Error: Unable to open the file " << filename << std::endl;
            return;
        }

        for (const auto& task : tasks) {
            outputFile << task.getName() << "," << task.getPriority() << std::endl;
        }

        outputFile.close();
        std::cout << "Tasks saved to " << filename << std::endl;
    }

    // Load tasks from a text file.
    void loadTasksFromFile(const std::string& filename) {
        std::ifstream inputFile(filename);
        if (!inputFile) {
            std::cerr << "Error: Unable to open the file " << filename << std::endl;
            return;
        }

        tasks.clear();
        std::string line;
        while (std::getline(inputFile, line)) {
            size_t commaPos = line.find(',');
            if (commaPos != std::string::npos) {
                std::string name = line.substr(0, commaPos);
                int priority = std::stoi(line.substr(commaPos + 1));
                tasks.emplace_back(name, priority);
            }
        }

        inputFile.close();
        std::cout << "Tasks loaded from " << filename << std::endl;
    }

private:
    std::vector<Task> tasks;
};

// Function to print the menu options.
void printMenu() {
    std::cout << "========== Task Manager ==========\n";
    std::cout << "1. Add Task\n";
    std::cout << "2. Remove Task\n";
    std::cout << "3. Display Tasks\n";
    std::cout << "4. Sort by Priority\n";
    std::cout << "5. Save Tasks to File\n";
    std::cout << "6. Load Tasks from File\n";
    std::cout << "0. Exit\n";
    std::cout << "==================================\n";
    std::cout << "Enter your choice: ";
}

int main() {
    TaskManager taskManager;

    int choice;
    std::string taskName;
    int taskPriority;
    std::string filename;

    do {
        printMenu();
        std::cin >> choice;

        switch (choice) {
            case 1:
                std::cout << "Enter task name: ";
                std::cin.ignore();
                std::getline(std::cin, taskName);
                std::cout << "Enter task priority (integer): ";
                std::cin >> taskPriority;
                taskManager.addTask(Task(taskName, taskPriority));
                break;
            case 2:
                std::cout << "Enter task name to remove: ";
                std::cin.ignore();
                std::getline(std::cin, taskName);
                taskManager.removeTask(taskName);
                break;
            case 3:
                taskManager.displayTasks();
                break;
            case 4:
                taskManager.sortByPriority();
                std::cout << "Tasks sorted by priority.\n";
                break;
            case 5:
                std::cout << "Enter the filename to save tasks: ";
                std::cin.ignore();
                std::getline(std::cin, filename);
                taskManager.saveTasksToFile(filename);
                break;
            case 6:
                std::cout << "Enter the filename to load tasks: ";
                std::cin.ignore();
                std::getline(std::cin, filename);
                taskManager.loadTasksFromFile(filename);
                break;
            case 0:
                std::cout << "Exiting Task Manager.\n";
                break;
            default:
                std::cout << "Invalid choice. Please try again.\n";
                break;
        }
    } while (choice != 0);

    return 0;
}
