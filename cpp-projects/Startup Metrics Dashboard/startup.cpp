#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <algorithm>
#include <ctime>
#include <fstream>

struct Metric {
    std::string name;
    double value;
    std::string timestamp;
};

class MetricsDashboard {
private:
    std::vector<Metric> metrics;

public:
    void addMetric(const std::string& name, double value) {
        std::time_t now = std::time(nullptr);
        std::string timestamp = std::asctime(std::localtime(&now));
        timestamp.erase(timestamp.length() - 1); // Remove newline
        metrics.push_back({name, value, timestamp});
    }

    void updateMetricValue(const std::string& name, double newValue) {
        auto it = std::find_if(metrics.begin(), metrics.end(),
                               [&](const Metric& metric) { return metric.name == name; });
        if (it != metrics.end()) {
            it->value = newValue;
            std::time_t now = std::time(nullptr);
            it->timestamp = std::asctime(std::localtime(&now));
            it->timestamp.erase(it->timestamp.length() - 1); // Remove newline
        } else {
            std::cout << "Error: Metric not found." << std::endl;
        }
    }

    void saveMetricsToFile(const std::string& filename) {
        std::ofstream file(filename);
        if (file.is_open()) {
            for (const auto& metric : metrics) {
                file << metric.name << "," << metric.value << "," << metric.timestamp;
                file << std::endl;
            }
            file.close();
            std::cout << "Metrics saved to " << filename << std::endl;
        } else {
            std::cout << "Error: Unable to save to file." << std::endl;
        }
    }

    void loadMetricsFromFile(const std::string& filename) {
        std::ifstream file(filename);
        if (file.is_open()) {
            metrics.clear();
            std::string line;
            while (std::getline(file, line)) {
                size_t pos1 = line.find(",");
                size_t pos2 = line.find(",", pos1 + 1);
                if (pos1 != std::string::npos && pos2 != std::string::npos) {
                    std::string name = line.substr(0, pos1);
                    double value = std::stod(line.substr(pos1 + 1, pos2 - pos1 - 1));
                    std::string timestamp = line.substr(pos2 + 1);
                    metrics.push_back({name, value, timestamp});
                }
            }
            file.close();
            std::cout << "Metrics loaded from " << filename << std::endl;
        } else {
            std::cout << "Error: Unable to load from file." << std::endl;
        }
    }

    void displayDashboard() {
        std::cout << "Startup Metrics Dashboard\n";
        std::cout << "-------------------------\n";
        for (const auto& metric : metrics) {
            std::cout << std::left << std::setw(20) << metric.name << ": " << metric.value;
            std::cout << " (Updated: " << metric.timestamp << ")";
            std::cout << std::endl;
        }
    }
};

int main() {
    MetricsDashboard dashboard;

    dashboard.loadMetricsFromFile("metrics.txt");

    int choice;
    do {
        std::cout << "\nStartup Metrics Dashboard\n";
        std::cout << "-------------------------\n";
        dashboard.displayDashboard();

        std::cout << "\nOptions:\n";
        std::cout << "1. Update Metric\n";
        std::cout << "2. Save Metrics and Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        if (choice == 1) {
            std::string metricName;
            double newValue;

            std::cout << "Enter the name of the metric to update: ";
            std::cin.ignore(); // Clear newline from previous input
            std::getline(std::cin, metricName);

            std::cout << "Enter the new value: ";
            std::cin >> newValue;

            dashboard.updateMetricValue(metricName, newValue);
            std::cout << "Metric updated successfully!\n";
        }
    } while (choice != 2);

    // Save metrics to file
    dashboard.saveMetricsToFile("metrics.txt");

    return 0;
}
