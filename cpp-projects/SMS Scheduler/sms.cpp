#include <iostream>
#include <string>
#include <chrono>
#include <thread>
#include <ctime>
#include <fstream>
#include <vector>

class Sms {
public:
    Sms(const std::string& recipient, const std::string& message)
        : recipient(recipient), message(message) {}

    void send() {
        std::cout << "Sending SMS to: " << recipient << "\n";
        std::cout << "Message: " << message << "\n";
        std::cout << "SMS sent successfully!\n";
    }

private:
    std::string recipient;
    std::string message;
};

class SmsScheduler {
public:
    void scheduleSms(const std::string& recipient, const std::string& message, const std::chrono::system_clock::time_point& scheduled_time) {
        scheduled_sms.push_back({ recipient, message, scheduled_time });
    }

    void listScheduledSms() const {
        std::cout << "Scheduled SMS Messages:\n";
        for (const auto& sms : scheduled_sms) {
            std::cout << "Recipient: " << sms.recipient << "\n";
            std::cout << "Message: " << sms.message << "\n";
            std::cout << "Scheduled Time: " << std::chrono::system_clock::to_time_t(sms.scheduled_time);
            std::cout << "\n\n";
        }
    }

    void processScheduledSms() {
        for (const auto& sms : scheduled_sms) {
            // Calculate delay duration
            std::chrono::system_clock::time_point now = std::chrono::system_clock::now();
            std::chrono::duration<double> delay_duration = sms.scheduled_time - now;

            if (delay_duration.count() > 0) {
                std::this_thread::sleep_for(delay_duration);
                Sms sms_instance(sms.recipient, sms.message);
                sms_instance.send();
                saveScheduledSms(sms.recipient, sms.message, sms.scheduled_time);
            }
        }
    }

private:
    struct ScheduledSms {
        std::string recipient;
        std::string message;
        std::chrono::system_clock::time_point scheduled_time;
    };

    std::vector<ScheduledSms> scheduled_sms;

    void saveScheduledSms(const std::string& recipient, const std::string& message, const std::chrono::system_clock::time_point& scheduled_time) {
        std::ofstream outfile("scheduled_sms.txt", std::ios_base::app);
        if (outfile) {
            outfile << "Recipient: " << recipient << "\n";
            outfile << "Message: " << message << "\n";
            outfile << "Scheduled Time: " << std::chrono::system_clock::to_time_t(scheduled_time);
            outfile << "\n\n";
            outfile.close();
        }
    }
};

int main() {
    SmsScheduler scheduler;

    while (true) {
        std::string recipient, message;
        int year, month, day, hour, minute;

        std::cout << "SMS Scheduler\n";
        std::cout << "Enter recipient's phone number (or type 'exit' to quit): ";
        std::getline(std::cin, recipient);

        if (recipient == "exit") {
            break;
        }

        std::cout << "Enter message: ";
        std::getline(std::cin, message);

        std::cout << "Enter year: ";
        std::cin >> year;

        std::cout << "Enter month: ";
        std::cin >> month;

        std::cout << "Enter day: ";
        std::cin >> day;

        std::cout << "Enter hour: ";
        std::cin >> hour;

        std::cout << "Enter minute: ";
        std::cin >> minute;

        std::cin.ignore();

        // Convert user input to time_point
        std::tm tm_time = {};
        tm_time.tm_year = year - 1900;
        tm_time.tm_mon = month - 1;
        tm_time.tm_mday = day;
        tm_time.tm_hour = hour;
        tm_time.tm_min = minute;

        std::time_t time = std::mktime(&tm_time);
        std::chrono::system_clock::time_point scheduled_time = std::chrono::system_clock::from_time_t(time);

        scheduler.scheduleSms(recipient, message, scheduled_time);
    }

    std::string list_scheduled_choice;
    std::cout << "Do you want to list scheduled SMS messages? (yes/no): ";
    std::cin >> list_scheduled_choice;

    if (list_scheduled_choice == "yes") {
        scheduler.listScheduledSms();
    }

    scheduler.processScheduledSms();

    return 0;
}
