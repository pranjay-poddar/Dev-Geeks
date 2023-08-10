import React, { useState } from "react";

const CalorieForm = ({
  onSubmit,
  dailyCalorieGoal,
  onDailyCalorieGoalChange,
}) => {
  const [mealName, setMealName] = useState("");
  const [caloriesConsumed, setCaloriesConsumed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      mealName,
      caloriesConsumed: parseFloat(caloriesConsumed),
    });
    setMealName("");
    setCaloriesConsumed("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center font-mono h-[30vh]"
    >
      <div className="flex items-center justify-center bg-[#404040] w-3/5 p-10 rounded-xl">
        <div className="flex">
          <label className="text-white">
            Daily Calorie Goal:
            <input
              className="border border-white rounded-lg text-black"
              type="number"
              value={dailyCalorieGoal}
              onChange={(e) => onDailyCalorieGoalChange(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="text-white">
            Meal Name:
            <input
              className="border border-white rounded-lg text-black"
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              required
            />
          </label>
          <br />
          <label className="text-white">
            Calories Consumed:
            <input
              className="border border-white rounded-lg text-black"
              type="number"
              value={caloriesConsumed}
              onChange={(e) => setCaloriesConsumed(e.target.value)}
              required
            />
          </label>
          <br />

          <button
            className="bg-green-600 text-white w-1/5 p-1 rounded-xl"
            type="submit"
          >
            Add Meal
          </button>
        </div>
      </div>
    </form>
  );
};

export default CalorieForm;
