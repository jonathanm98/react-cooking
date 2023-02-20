import React from "react";

const Recipe = ({ meal, removeMeal }) => {
  const ingredientsValues = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredientsValues.push(`${ingredient} - ${measure}`);
    }
  }
  console.log(ingredientsValues);
  return (
    <div className="recipe-main-container">
      <div className="recipe-container">
        <button className="close-btn" onClick={removeMeal}>
          <p>Close</p>
          <img src="./img/xmark-solid.svg" alt="" />
        </button>
        <div className="recipe-infos">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="recipe-requirements">
            <h2>{meal.strMeal}</h2>
            {ingredientsValues.map((ingredient) => {
              return <p key={ingredient}>{ingredient}</p>;
            })}
          </div>
        </div>
        <div className="recipe-steps">
          <h3>Instructions</h3>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
