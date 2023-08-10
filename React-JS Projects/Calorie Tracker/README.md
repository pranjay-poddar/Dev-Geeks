# Calorie Tracker

The Calorie Tracker App is a simple web application built with React that allows users to track their daily calorie intake, set a daily calorie goal, add meals, and delete meal items.

## Features

- Set a daily calorie goal to achieve weight-related objectives.
- Add meals throughout the day with their respective calorie counts.
- Track the total calories consumed for the day.
- Receive an alert when the daily calorie goal is reached.
- Persist data (meal entries, daily calorie goal, and total calories consumed) across page refreshes using `localStorage`.

## Getting Started

1. Clone the repository to your local machine:
```
git clone <repository_url>
```
2. Navigate to the project directory:
```
cd calorieTracker
```
3. Install the required dependencies:
```
npm install
```
4. Start the development server:
```
npm run start
```


The app will be accessible at `http://localhost:3000` in your web browser.

## How to Use

1. Upon launching the app, you'll see the "Calorie Tracker App" with a default daily calorie goal of 2000.

2. To change the daily calorie goal, enter a new value in the input field under "Daily Calorie Goal" and press Enter.

3. To add a meal, fill in the "Meal Name" and "Calories Consumed in a Meal or Snack" fields in the form and click "Add Meal".

4. The meal entry will be added to the list of meals, and the "Total Calories Consumed Today" will be updated accordingly.

5. If the total calories consumed reach or exceed the daily calorie goal, you'll receive an alert congratulating you on reaching your goal.

6. To delete a meal, click the "Delete" button next to the respective meal entry in the list.

7. Data (meal entries, daily calorie goal, and total calories consumed) will be persisted across page refreshes, allowing you to continue tracking your calories over multiple sessions.