"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const fetchMealIdeas = async (ingredient) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  return data.meals || [];
};

const fetchMealDetails = async (mealId) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  return data.meals[0];
};

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [mealDetailsCache, setMealDetailsCache] = useState({});

  const loadMealIdeas = useCallback(async () => {
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
  }, [ingredient]);

  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient, loadMealIdeas]);

  const handleMealClick = async (mealId) => {
    if (mealDetailsCache[mealId]) {
      setExpandedMealId((prevId) => (prevId === mealId ? null : mealId));
    } else {
      const mealDetails = await fetchMealDetails(mealId);
      setMealDetailsCache((prevCache) => ({
        ...prevCache,
        [mealId]: mealDetails,
      }));
      setExpandedMealId(mealId);
    }
  };

  const getIngredientsList = (mealId) => {
    const details = mealDetailsCache[mealId];
    if (!details) return [];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (details[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: details[`strIngredient${i}`],
          measure: details[`strMeasure${i}`],
        });
      }
    }
    return ingredients;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Meal Ideas with {ingredient}
      </h2>
      {meals.length === 0 ? (
        <p className="text-white">No meal ideas found for {ingredient}.</p>
      ) : (
        <ul className="space-y-4">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleMealClick(meal.idMeal)}
            >
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={64}
                height={64}
                className="rounded-full"
              />
              <span className="text-white text-lg">{meal.strMeal}</span>

              {expandedMealId === meal.idMeal && (
                <div className="mt-4 max-h-[300px] overflow-y-auto transition-all duration-300 ease-in-out">
                  <h4 className="text-lg text-white">Ingredients:</h4>
                  <ul className="space-y-2 mt-2">
                    {getIngredientsList(meal.idMeal).map(
                      (ingredient, index) => (
                        <li key={index} className="text-white">
                          {ingredient.ingredient} - {ingredient.measure}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
