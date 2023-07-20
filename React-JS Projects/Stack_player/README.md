# Stack Player
**A video player WebApp.


This is a powerful and feature-rich video player website built using React.js, Redux.js, and Firebase. The video player is designed to play local system videos and has the potential to expand its capabilities to play videos from both local and internet sources.

## Features

- **Local and Online Video Playback:** Currently, the video player supports playing local system videos, and in the future, it will be enhanced to play videos from various online sources as well.

- **Unique Feature: Notes for Video Durations:** One of the standout features of this video player is the ability to add notes for specific durations of videos. This allows users to mark important moments or add annotations for easy reference.

- **Intuitive Shortcut Controls:** The video player provides an array of shortcut controls to enhance the user experience. Currently implemented shortcuts include play/pause, full screen, and 10-second backward/forward seek. More shortcuts will be added in the future to streamline navigation and video control.

- **Support for Various Video Formats:** The video player is designed to handle any type of video format, ensuring compatibility and seamless playback for a wide range of media files.

- **Flexible Playback Options:** In the future, the video player aims to introduce additional playback options, such as preferred video quality and playback speed, similar to popular video platforms like YouTube.

- **Drag and Drop Multiple Files:** Users can effortlessly drag and drop multiple video files onto the player, allowing for convenient playback of a playlist or queue of videos, playing them sequentially.Additionally, shortcut buttons is  implemented to play the next and previous videos in the list.

- **Video Filtering and Search:** A future development plan for the video player includes the ability to filter and search through the list of videos, providing efficient video management and organization. 



## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version 12 or higher)
- NPM (Node Package Manager)

### Installation

Clone the repository:
```bash
git clone https://github.com/ayarvind/Stack-Player.git
cd Stack-Player
npm install
```



## Configuration

Before running the project, you need to configure your Firebase credentials. Follow these steps:

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).

2. Obtain your Firebase configuration credentials.

3. Open the `.env.local` file in the project root directory.

4. Update the placeholder values with your Firebase configuration credentials:

   ```env
   REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
   REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
    ```
##Running the Project
To start the development server and run the project locally, use the following command:

```bash
    npm run dev
```

This will start the development server and provide you with a local URL where you can access the video player website in your browser.

Open your browser and visit the following URL: http://localhost:5173.

You should now see the video player website and can start exploring its features.


