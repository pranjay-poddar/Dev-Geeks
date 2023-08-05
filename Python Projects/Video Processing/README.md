## Video Resolution Processing Application

This application is designed to change the resolution of the camera-captured video using openCV. User can choose what resolution they want their video to be in, and then the script would output the same video in the specified resolution.


## Usage
- User executed the program
- User is prompted to choose a particular resolution
- The script starts displaying the captured video
- The resolution-altered video gets saved into the local storage of the user's computer.

## Techstack used

- Python 3.0
- OpenCV
- cv2

## Script Processes upon execution
Steps:

- Loads a video using cv2.VideoCapture()
- Create a VideoWriter object using cv2.VideoWriter()
- Extract frame by frame
- Resize the frames using cv2.resize()
- Save the frames to a video file using cv2.VideoWriter()
- Release the VideoWriter and destroy all windows






