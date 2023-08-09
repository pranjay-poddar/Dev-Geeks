import React, { useState, useEffect } from "react";
import CalorieForm from "./components/CalorieForm";
import CalorieList from "./components/CalorieList";

const App = () => {
  const [calorieEntries, setCalorieEntries] = useState(() => {
    const savedCalorieEntries = localStorage.getItem("calorieEntries");
    return savedCalorieEntries ? JSON.parse(savedCalorieEntries) : [];
  });
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(() => {
    const savedDailyCalorieGoal = localStorage.getItem("dailyCalorieGoal");
    return savedDailyCalorieGoal ? parseFloat(savedDailyCalorieGoal) : "2000";
  });
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(() => {
    const total = calorieEntries.reduce(
      (total, entry) => total + entry.caloriesConsumed,
      0
    );
    return total;
  });

  useEffect(() => {
    localStorage.setItem("calorieEntries", JSON.stringify(calorieEntries));
    localStorage.setItem("dailyCalorieGoal", dailyCalorieGoal.toString());

    if (totalCaloriesConsumed >= dailyCalorieGoal) {
      alert("Congratulations! You have reached your daily calorie goal!");
    }
  }, [calorieEntries, dailyCalorieGoal, totalCaloriesConsumed]);

  const handleAddMeal = ({ mealName, caloriesConsumed }) => {
    setCalorieEntries([...calorieEntries, { mealName, caloriesConsumed }]);
    setTotalCaloriesConsumed((prevTotal) => prevTotal + caloriesConsumed);
  };

  const handleDeleteMeal = (index) => {
    const updatedCalorieEntries = [...calorieEntries];
    const deletedCalories = updatedCalorieEntries.splice(index, 1)[0]
      .caloriesConsumed;
    setCalorieEntries(updatedCalorieEntries);
    setTotalCaloriesConsumed((prevTotal) => prevTotal - deletedCalories);
  };

  const handleDailyCalorieGoalChange = (value) => {
    setDailyCalorieGoal(parseFloat(value));
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="font-mono text-white text-4xl mt-6 mb-6">
          Calorie Tracker
        </h1>
      </div>
      <div className="flex justify-center mb-6 mx-auto bg-[#404040] w-3/5 p-10 rounded-xl">
        <div className="flex items-center justify-center">
          <h3 className="font-mono text-white text-lg">
            Daily Calorie Goal: {dailyCalorieGoal}
          </h3>
        </div>
      </div>

      <CalorieForm
        onSubmit={handleAddMeal}
        dailyCalorieGoal={dailyCalorieGoal}
        onDailyCalorieGoalChange={handleDailyCalorieGoalChange}
      />
      <CalorieList
        calorieEntries={calorieEntries}
        onDelete={handleDeleteMeal}
      />
      <div className="flex justify-center mt-6 mb-6 mx-auto bg-[#404040] w-3/5 p-10 rounded-xl">
        <div className="flex items-center justify-center">
          <p className="font-mono text-white">
            Total Calories Consumed Today: {totalCaloriesConsumed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
