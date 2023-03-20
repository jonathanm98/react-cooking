import React from "react";

const Meal = ({ recipe, handleCardClick }) => {
  const handleClick = () => {
    handleCardClick(recipe);
  };

  return (
    <div className="meal-card" id={recipe.idMeal} onClick={handleClick}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="meal-card-infos">
        <h2>{recipe.strMeal}</h2>
        <h3>{recipe.strCategory}</h3>
      </div>
    </div>
  );
};

export default Meal;
