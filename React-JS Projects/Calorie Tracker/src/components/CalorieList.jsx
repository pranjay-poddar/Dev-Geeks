import React from "react";

const CalorieList = ({ calorieEntries, onDelete }) => {
  return (
    <div className=" mt-6 mb-6 flex items-center justify-center mx-auto bg-[#404040] w-3/5 p-6 rounded-xl">
      <div className="flex items-center justify-center">
        <ul className="font-mono text-white gap-2 text-sm">
          {calorieEntries.map((entry, index) => (
            <li key={index}>
              Meal: {entry.mealName} - Calories: {entry.caloriesConsumed}
              <button
                className="bg-red-600 text-white w-2/5 p-1 rounded-xl"
                onClick={() => onDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalorieList;
