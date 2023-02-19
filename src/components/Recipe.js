import React from "react";

const Recipe = ({ meal, removeMeal }) => {
  return (
    <div className="recipe-main-container">
      <button className="close-btn" onClick={removeMeal}>
        {/* <p>Close</p> */}
        <img src="./img/xmark-solid.svg" alt="" />
      </button>
      <div className="recipe-container">
        <h2>{meal.strMeal}</h2>
      </div>
    </div>
  );
};

export default Recipe;
