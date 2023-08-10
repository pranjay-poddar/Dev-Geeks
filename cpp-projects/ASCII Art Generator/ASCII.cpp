#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm>

using namespace std;

const string ASCII_CHARS = "@%#*+=-:. ";

// Function to resize the image while preserving the aspect ratio
void resizeImage(vector<vector<int>>& image, int newWidth) {
    int originalWidth = image[0].size();
    int originalHeight = image.size();
    double aspectRatio = static_cast<double>(originalWidth) / static_cast<double>(originalHeight);
    int newHeight = static_cast<int>(newWidth / aspectRatio);

    vector<vector<int>> resizedImage(newHeight, vector<int>(newWidth, 0));

    for (int i = 0; i < newHeight; i++) {
        for (int j = 0; j < newWidth; j++) {
            int y = static_cast<int>(i * originalHeight / newHeight);
            int x = static_cast<int>(j * originalWidth / newWidth);
            resizedImage[i][j] = image[y][x];
        }
    }

    image = resizedImage;
}

// Function to convert a pixel to ASCII character
char pixelToChar(int pixelValue) {
    int totalChars = ASCII_CHARS.length();
    int index = pixelValue * (totalChars - 1) / 255;
    return ASCII_CHARS[index];
}

// Function to convert the image to ASCII art
string imageToAscii(const vector<vector<int>>& image) {
    string asciiArt;
    for (const auto& row : image) {
        for (int pixel : row) {
            asciiArt += pixelToChar(pixel);
        }
        asciiArt += '\n';
    }
    return asciiArt;
}

int main() {
    string imagePath;
    cout << "Enter the path to the image: ";
    cin >> imagePath;

    ifstream imageFile(imagePath, ios::binary);
    if (!imageFile) {
        cerr << "Error: Unable to read the image file." << endl;
        return 1;
    }

    // Read the image header (skip PPM format header)
    string header;
    imageFile >> header;
    if (header != "P6") {
        cerr << "Error: Invalid image format. Only PPM format (P6) is supported." << endl;
        return 1;
    }

    int width, height, maxColor;
    imageFile >> width >> height >> maxColor;
    imageFile.ignore(); // Ignore the newline character

    // Read the image data
    vector<vector<int>> image(height, vector<int>(width, 0));
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            char r, g, b;
            imageFile.read(&r, 1);
            imageFile.read(&g, 1);
            imageFile.read(&b, 1);
            int pixelValue = static_cast<int>(0.3 * static_cast<unsigned char>(r) +
                                              0.59 * static_cast<unsigned char>(g) +
                                              0.11 * static_cast<unsigned char>(b));
            image[i][j] = pixelValue;
        }
    }

    int newWidth;
    cout << "Enter the desired width for the ASCII art: ";
    cin >> newWidth;

    resizeImage(image, newWidth);
    string asciiArt = imageToAscii(image);

    cout << "ASCII Art:\n" << asciiArt;

    return 0;
}
