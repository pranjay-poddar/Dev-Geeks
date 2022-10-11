import fs from "fs";

export const writeScreenCap = async (filename, config) => {
    return new Promise((resolve) => {
        fs.copyFile(filename, config.fileOut + '.png', () => {
            resolve();
        });
    });
}