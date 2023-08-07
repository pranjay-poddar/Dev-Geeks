#include <iostream>
#include <string>
#include <vector>

class MaintenanceTask {
public:
    enum class TaskType {
        Inspection,
        Repair,
        Overhaul
    };

private:
    TaskType type;
    std::string description;
    int hoursRequired;

public:
    MaintenanceTask(TaskType t, const std::string& desc, int hours)
        : type(t), description(desc), hoursRequired(hours) {}

    void displayInfo() {
        std::string typeStr;
        switch (type) {
            case TaskType::Inspection: typeStr = "Inspection"; break;
            case TaskType::Repair: typeStr = "Repair"; break;
            case TaskType::Overhaul: typeStr = "Overhaul"; break;
        }
        std::cout << "Task Type: " << typeStr << "\n";
        std::cout << "Description: " << description << "\n";
        std::cout << "Hours Required: " << hoursRequired << "\n";
    }
};

class Aircraft {
private:
    std::string registration;
    std::string type;
    int flightHours;
    std::vector<MaintenanceTask> maintenanceTasks;

public:
    Aircraft(const std::string& reg, const std::string& t)
        : registration(reg), type(t), flightHours(0) {}

    void performFlight(int hours) {
        flightHours += hours;
    }

    void addMaintenanceTask(const MaintenanceTask& task) {
        maintenanceTasks.push_back(task);
    }

    void displayInfo() {
        std::cout << "Registration: " << registration << "\n";
        std::cout << "Aircraft Type: " << type << "\n";
        std::cout << "Total Flight Hours: " << flightHours << "\n";
        std::cout << "Maintenance Tasks:\n";
        for (size_t i = 0; i < maintenanceTasks.size(); ++i) {
            std::cout << "Task " << i + 1 << ":\n";
            maintenanceTasks[i].displayInfo();
            std::cout << "------------------------\n";
        }
    }


    const std::vector<MaintenanceTask>& getMaintenanceTasks() const {
        return maintenanceTasks;
    }
    void modifyAircraftInfo(const std::string& newType) {
        type = newType;
    }

    void modifyMaintenanceTask(int taskIndex, MaintenanceTask::TaskType newType,
                               const std::string& newDesc, int newHours) {
        if (taskIndex >= 0 && taskIndex < maintenanceTasks.size()) {
            maintenanceTasks[taskIndex] = MaintenanceTask(newType, newDesc, newHours);
        }
    }
};


int main() {
    Aircraft aircraft("ABC123", "Boeing 737");

    MaintenanceTask task1(MaintenanceTask::TaskType::Inspection, "Routine Checkup", 2);
    MaintenanceTask task2(MaintenanceTask::TaskType::Repair, "Replace Engine Fan", 6);

    aircraft.addMaintenanceTask(task1);
    aircraft.addMaintenanceTask(task2);

    aircraft.performFlight(4);

    std::cout << "Aircraft Information:\n";
    aircraft.displayInfo();

    // Modify Aircraft Information
    std::cout << "Enter new aircraft type: ";
    std::string newType;
    std::cin.ignore(); // Clear newline from previous input
    std::getline(std::cin, newType);

    aircraft.modifyAircraftInfo(newType);

    // Modify Maintenance Task
    int taskIndex;
    std::cout << "Enter task index to modify: ";
    std::cin >> taskIndex;

    if (taskIndex >= 0 && taskIndex < aircraft.getMaintenanceTasks().size()) {
        // ... (Code for modifying existing task, as before)
    }

    // Add New Maintenance Task
    std::cout << "Enter new task type (0: Inspection, 1: Repair, 2: Overhaul): ";
    int newTypeChoice;
    std::cin >> newTypeChoice;
    MaintenanceTask::TaskType newTaskType = static_cast<MaintenanceTask::TaskType>(newTypeChoice);

    std::cin.ignore(); // Clear newline from previous input
    std::cout << "Enter new task description: ";
    std::string newTaskDesc;
    std::getline(std::cin, newTaskDesc);

    std::cout << "Enter new task hours required: ";
    int newTaskHours;
    std::cin >> newTaskHours;

    MaintenanceTask newTask(newTaskType, newTaskDesc, newTaskHours);
    aircraft.addMaintenanceTask(newTask);

    // Display the modified aircraft information
    std::cout << "Updated Aircraft Information:\n";
    aircraft.displayInfo();

    return 0;
}
