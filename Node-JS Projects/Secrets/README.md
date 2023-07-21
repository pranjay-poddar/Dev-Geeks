# Secrets Web Application

This is a web application built using Node.js, EJS, Express.js, and OAuth with Passport.js. The application allows users to read and share anonymous secrets.

## Features

- User authentication and authorization using OAuth with Passport.js
- Anonymous secret sharing
- User-friendly interface using EJS templates
- Express.js framework for handling HTTP requests and routes

## Prerequisites

Make sure you have the following installed before running the application:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/secrets-web-app.git

```
2. Navigate to the project directory:
```bash
cd Secrets
```
3. Install dependencies:
```bash
npm install
```
4. Set up environment variables:
Create a `.env` file in the root of the project and add the following variables:
```bash
SECRET=ThisIsMyLittleSecret
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```
Make sure to replace `your_session_secret`(SECRET), `your_google_client_id`,`your_google_client_secret`, `your_github_client_id` and `your_github_client_secret` with your own values. These variables are required for session management and OAuth with Google and GitHub.
5. Start the application:
```bash
npm start
```
6. Open your browser and navigate to `http://localhost:3000` to access the application.
