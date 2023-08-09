#include <iostream>
#include <vector>
#include <cmath>
#include <limits> 

struct Point {
    double x;
    double y;
};

class TerrainElevationProfileGenerator {
private:
    std::vector<Point> terrainData;
    double highestElevation;
    double lowestElevation;

public:
    TerrainElevationProfileGenerator() : highestElevation(-1e9), lowestElevation(1e9) {}

    void addDataPoint(double x, double y) {
        terrainData.push_back({x, y});
        updateElevationRange(y);
    }

    void updateElevationRange(double elevation) {
        if (elevation > highestElevation) {
            highestElevation = elevation;
        }
        if (elevation < lowestElevation) {
            lowestElevation = elevation;
        }
    }

    double calculateSlope(double x1, double y1, double x2, double y2) {
        return (y2 - y1) / (x2 - x1);
    }

    double interpolateElevation(double x) {
        for (size_t i = 1; i < terrainData.size(); ++i) {
            if (x <= terrainData[i].x) {
                const Point& prevPoint = terrainData[i - 1];
                const Point& nextPoint = terrainData[i];
                double slope = calculateSlope(prevPoint.x, prevPoint.y, nextPoint.x, nextPoint.y);
                return prevPoint.y + slope * (x - prevPoint.x);
            }
        }
        return terrainData.back().y; // Extrapolate using last point
    }

    void generateElevationProfile() {
        std::cout << "Elevation Profile:\n";
        for (size_t i = 0; i < terrainData.size(); ++i) {
            const Point& currentPoint = terrainData[i];
            std::cout << "Distance: " << currentPoint.x << " meters, Elevation: " << currentPoint.y << " meters";

            if (i > 0) {
                const Point& prevPoint = terrainData[i - 1];
                double slope = calculateSlope(prevPoint.x, prevPoint.y, currentPoint.x, currentPoint.y);
                std::cout << ", Slope: " << slope;
            }

            std::cout << "\n";
        }
        std::cout << "Highest Elevation: " << highestElevation << " meters\n";
        std::cout << "Lowest Elevation: " << lowestElevation << " meters\n";
    }

    void modifyDataPoint(double x, double y) {
        // Find the nearest data point and modify its elevation
        double minDistance = std::numeric_limits<double>::max();
        size_t nearestIndex = 0;
        for (size_t i = 0; i < terrainData.size(); ++i) {
            double distance = std::abs(x - terrainData[i].x);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = i;
            }
        }
        terrainData[nearestIndex].y = y;
        updateElevationRange(y);
    }
};

int main() {
    TerrainElevationProfileGenerator generator;

    // Add initial data points
    generator.addDataPoint(0.0, 100.0);
    generator.addDataPoint(50.0, 150.0);
    generator.addDataPoint(100.0, 120.0);
    generator.addDataPoint(150.0, 180.0);

    // Generate and display the elevation profile
    generator.generateElevationProfile();

    // Interpolate and display elevation at a specific distance
    double distanceToInterpolate = 75.0;
    double interpolatedElevation = generator.interpolateElevation(distanceToInterpolate);
    std::cout << "Interpolated Elevation at " << distanceToInterpolate << " meters: " << interpolatedElevation << " meters\n";

    // Modify a data point
    double newElevation;
    std::cout << "Enter new elevation value: ";
    std::cin >> newElevation;
    generator.modifyDataPoint(distanceToInterpolate, newElevation);

    // Regenerate and display the updated elevation profile
    generator.generateElevationProfile();

    return 0;
}
