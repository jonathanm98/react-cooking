import axios from "axios";
import React, { useState } from "react";
import Meal from "../components/Meal";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [areas, setAreas] = useState([]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (!text) {
      setMeals([]);
      setAreas([]);
      return;
    }
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + text)
      .then((res) => {
        setMeals(res.data.meals);
        res.data.meals
          ? setAreas([...new Set(res.data.meals.map((meal) => meal.strArea))])
          : setAreas([]);
      });
  };

  return (
    <div>
      <div className="title">
        <h1>Recherchez une recette</h1>
      </div>
      <div className="inputs-container">
        <input
          type="text"
          name="meal-input"
          id="meal-input"
          placeholder="Saisir aliment ou recette"
          onChange={handleTextChange}
        />
        {areas &&
          areas.map((area) => {
            return (
              <li>
                <input
                  key={area}
                  type="radio"
                  name="countryRadio"
                  id={area}
                  value={area}
                />
                <label htmlFor={area}>{area}</label>
              </li>
            );
          })}
        <input type="button" value="Reset filters" />
      </div>
    </div>
  );
};

export default Home;
