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
  const removeActiveMeal = () => {
    setActiveMeal({});
  };
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 ? false : true;
  }

  const handleTextChange = (e) => {
    const text = e.target.value;
    setTextInput(text.length);

    setAreaFilter([]);
    const allElements = document.querySelectorAll(".country-radio-element");
    allElements.forEach((item) => {
      item.classList.remove("active");
    });
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

  const handleCardClick = (meal) => {
    setActiveMeal(meal);
  };

  return (
    <main>
      <div
        className={
          !isObjectEmpty(activeMeal)
            ? "inputs-container"
            : "inputs-container disabled"
        }
      >
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
            {meals[0] && <h3 className="filter-title">Filter by country :</h3>}
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
      {meals[0] ? (
        !isObjectEmpty(activeMeal) ? (
          <div className="main-container">
            <div className="recipe-cards-container">
              {areaFilter[0]
                ? meals
                    .filter((meal) => areaFilter.includes(meal.strArea))
                    .map((meal) => {
                      return (
                        <Meal
                          key={meal.idMeal}
                          recipe={meal}
                          handleCardClick={handleCardClick}
                        />
                      );
                    })
                : meals.map((meal) => {
                    return (
                      <Meal
                        key={meal.idMeal}
                        recipe={meal}
                        handleCardClick={handleCardClick}
                      />
                    );
                  })}
            </div>
          </div>
        ) : (
          <Recipe removeMeal={removeActiveMeal} meal={activeMeal} />
        )
      ) : (
        <h3 className="error-h3">
          {textInput === 0 ? "Make your first search !" : "No recipe found..."}
        </h3>
      )}
    </main>
  );
};

export default Home;
