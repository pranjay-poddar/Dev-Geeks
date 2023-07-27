import java.util.Scanner;

public class Projectile {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter launch angle (in degrees): ");
        double angle = scanner.nextDouble();

        System.out.print("Enter initial velocity (in m/s): ");
        double velocity = scanner.nextDouble();

        System.out.print("Enter time interval (in seconds): ");
        double timeInterval = scanner.nextDouble();

        System.out.print("Enter maximum simulation time (in seconds): ");
        double maxSimulationTime = scanner.nextDouble();

        // User option for air resistance
        System.out.print("Consider air resistance? (true/false): ");
        boolean considerAirResistance = scanner.nextBoolean();

        // Convert angle to radians
        double angleRad = Math.toRadians(angle);

        // Constants
        final double GRAVITY = 9.81; // Acceleration due to gravity in m/s^2
        final double AIR_RESISTANCE_FACTOR = 0.1; // A constant to model air resistance

        // Calculate horizontal and vertical components of velocity
        double vx = velocity * Math.cos(angleRad);
        double vy = velocity * Math.sin(angleRad);

        // Initialize position variables
        double x = 0.0;
        double y = 0.0;
        double time = 0.0;

        // Additional variables for projectile height and range calculation
        double maxHeight = 0.0;
        double range = 0.0;

        // Simulation loop
        while (y >= 0.0 && time <= maxSimulationTime) {
            // Calculate new position using equations of motion
            double airResistance = 0.0;
            if (considerAirResistance) {
                airResistance = AIR_RESISTANCE_FACTOR * velocity * velocity;
            }

            x = x + vx * timeInterval;
            y = y + vy * timeInterval - 0.5 * GRAVITY * timeInterval * timeInterval - airResistance;

            // Update vertical velocity due to gravity and air resistance
            vy = vy - GRAVITY * timeInterval - AIR_RESISTANCE_FACTOR * vy * timeInterval;

            // Update max height and range
            if (y > maxHeight) {
                maxHeight = y;
            }
            range = x;

            // Display projectile's position on the command line
            int displayX = (int) (x / 5); // Adjust scaling for display
            int displayY = (int) (y / 2); // Adjust scaling for display

            System.out.println("Position: " + displayX + " " + displayY);

            // Increment time
            time += timeInterval;
        }

        // Check if the projectile hits the ground or reaches maxSimulationTime
        if (y < 0.0) {
            System.out.println("Projectile has hit the ground.");
        } else {
            System.out.println("Maximum simulation time reached.");
        }

        // Display additional results
        System.out.println("Maximum Height: " + maxHeight + " meters");
        System.out.println("Projectile Range: " + range + " meters");
        System.out.println("Time of Flight: " + time + " seconds");
    }
}
