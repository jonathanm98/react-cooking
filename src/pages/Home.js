import axios from "axios";
import React, { useEffect, useState } from "react";
import Meal from "../components/Meal";
import Recipe from "../components/Recipe";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [areas, setAreas] = useState([]);
  const [textInput, setTextInput] = useState(0);
  const [areaFilter, setAreaFilter] = useState([]);

  const [activeMeal, setActiveMeal] = useState({});

  const handleTextChange = (e) => {
    const text = e.target.value;
    setTextInput(text.length);
    if (!text) {
      setMeals([]);
      setAreas([]);
      return;
    }
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + text)
      .then((res) => {
        res.data.meals
          ? setMeals(
              res.data.meals.filter((meal) => meal.strArea !== "Unknown")
            )
          : setMeals([]);
        res.data.meals
          ? setAreas([
              ...new Set(
                res.data.meals
                  .map((meal) => meal.strArea)
                  .filter((area) => area !== "Unknown")
              ),
            ])
          : setAreas([]);
      });
  };

  useEffect(() => {
    const allCards = document.querySelectorAll(".meal-card");
    for (let i = 0; i < allCards.length; i++) {
      allCards[i].addEventListener("click", (e) => {
        const id = e.currentTarget.id;
        const meal = meals.find((meal) => meal.idMeal === id);
        setActiveMeal(meal);
      });
    }
  }, [meals]);

  return (
    <main>
      <div className="recipe-main-container">
        <Recipe meal={activeMeal} />
      </div>
      <div className="inputs-container">
        <h1>React Cook recipes</h1>
        <input
          type="text"
          name="meal-input"
          id="meal-input"
          placeholder="Enter a recipe name"
          onChange={handleTextChange}
        />
        {areas && (
          <div className="filter-container">
            {meals[0] && <h3 className="filter-title">Filter by country</h3>}
            <ul className="country-radio">
              {areas.map((area) => {
                return (
                  <div key={area} className="country-radio-element">
                    <input
                      type="radio"
                      name="countryRadio"
                      id={area}
                      value={area}
                      onClick={(e) => {
                        const allElements = document.querySelectorAll(
                          ".country-radio-element"
                        );
                        allElements.forEach((item) => {
                          if (item.children[0].id === e.target.id) {
                            if (item.classList.contains("active")) {
                              item.classList.remove("active");
                              setAreaFilter([]);
                              return;
                            }
                            item.classList.add("active");
                            setAreaFilter([e.target.value]);
                          } else {
                            item.classList.remove("active");
                          }
                        });
                      }}
                    />
                    <label htmlFor={area}>{area}</label>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="main-container">
        {meals[0] ? (
          <div className="recipe-cards-container">
            {areaFilter[0]
              ? meals
                  .filter((meal) => areaFilter.includes(meal.strArea))
                  .map((meal) => {
                    return <Meal key={meal.idMeal} recipe={meal} />;
                  })
              : meals.map((meal) => {
                  return <Meal key={meal.idMeal} recipe={meal} />;
                })}
          </div>
        ) : (
          <h2 className="error-h2">
            {textInput === 0 ? "Make your first search" : "No recipe found"}
          </h2>
        )}
      </div>
    </main>
  );
};

export default Home;
