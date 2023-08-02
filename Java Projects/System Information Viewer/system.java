import java.lang.management.ManagementFactory;
import com.sun.management.OperatingSystemMXBean;
import java.io.File;
import java.text.DecimalFormat;

public class system {

    public static void main(String[] args) {
        displaySystemInformation();
    }

    private static void displaySystemInformation() {
        System.out.println("System Information:");
        System.out.println("-------------------");

        // Get CPU usage
        OperatingSystemMXBean osBean = ManagementFactory.getPlatformMXBean(OperatingSystemMXBean.class);
        double cpuUsage = osBean.getSystemCpuLoad() * 100;
        System.out.println("CPU Usage: " + String.format("%.2f", cpuUsage) + "%");

        // Get memory usage
        long totalMemory = Runtime.getRuntime().totalMemory();
        long freeMemory = Runtime.getRuntime().freeMemory();
        long usedMemory = totalMemory - freeMemory;
        System.out.println("Memory Usage: " + formatBytes(usedMemory) + " / " + formatBytes(totalMemory));

        // Get disk space
        File file = new File("/");
        long totalSpace = file.getTotalSpace();
        long freeSpace = file.getFreeSpace();
        long usedSpace = totalSpace - freeSpace;
        System.out.println("Disk Space: " + formatBytes(usedSpace) + " / " + formatBytes(totalSpace));

        // Get network statistics (Note: This is just an example and may not work on all systems)
        // You can use external libraries for more accurate network statistics retrieval.
        // Here, we are just showing placeholders for demonstration purposes.
        System.out.println("Network Statistics:");
        System.out.println("   Packets Sent: 100");
        System.out.println("   Packets Received: 85");
        System.out.println("   Bytes Sent: 1024 KB");
        System.out.println("   Bytes Received: 768 KB");

        // Get disk usage, CPU cores, and OS version
        System.out.println("-------------------");
        // Disk Usage
        long totalDiskSpace = file.getTotalSpace();
        long usableDiskSpace = file.getUsableSpace();
        long diskSpaceUsed = totalDiskSpace - usableDiskSpace;
        System.out.println("Disk Usage: " + formatBytes(diskSpaceUsed) + " / " + formatBytes(totalDiskSpace));

        // CPU Cores
        int cpuCores = osBean.getAvailableProcessors();
        System.out.println("CPU Cores: " + cpuCores);

        // OS Version
        String osVersion = System.getProperty("os.name") + " " + System.getProperty("os.version");
        System.out.println("Operating System: " + osVersion);

        // Other additional features can be added here
        // Example: System uptime, available memory, disk usage for specific directories, etc.
    }

    private static String formatBytes(long bytes) {
        int unit = 1024;
        if (bytes < unit) {
            return bytes + " B";
        }
        int exp = (int) (Math.log(bytes) / Math.log(unit));
        String pre = "KMGTPE".charAt(exp - 1) + "";
        return String.format("%.2f %sB", bytes / Math.pow(unit, exp), pre);
    }
}
