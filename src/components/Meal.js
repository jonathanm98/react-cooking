import React from "react";

const Meal = ({ recipe }) => {
  console.log(recipe);
  return (
    <div className="meal-card">
      <h3>{recipe.strMeal}</h3>
    </div>
  );
};

export default Meal;
