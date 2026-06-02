"use client";

import { useState } from "react";

export default function NewRecipePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [ingredients, setIngredients] =
    useState([""]);

  const [directions, setDirections] =
    useState([""]);

  const [categoryId, setCategoryId] =
    useState("");

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      "",
    ]);
  };

  const updateIngredient = (
    index: number,
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addDirection = () => {
    setDirections([
      ...directions,
      "",
    ]);
  };

  const updateDirection = (
    index: number,
    value: string
  ) => {
    const updated = [...directions];
    updated[index] = value;
    setDirections(updated);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/recipes",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          ingredients,
          directions,
          categoryId,
        }),
      }
    );

    if (response.ok) {
      alert("Recipe saved!");

      setTitle("");
      setDescription("");
      setIngredients([""]);
      setDirections([""]);
      setCategoryId("");
    } else {
      alert("Error saving recipe");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Create New Recipe
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6"
      >
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-2 block w-80"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-2 block w-80 h-24 mt-4"
        />

        <h2 className="font-bold mt-4">
          Ingredients
        </h2>

        {ingredients.map(
          (ingredient, index) => (
            <input
              key={index}
              value={ingredient}
              onChange={(e) =>
                updateIngredient(
                  index,
                  e.target.value
                )
              }
              placeholder={`Ingredient ${
                index + 1
              }`}
              className="border p-2 block mt-2 w-80"
            />
          )
        )}

        <button
          type="button"
          onClick={addIngredient}
          className="border p-2 mt-2"
        >
          Add Ingredient
        </button>

        <h2 className="font-bold mt-6">
          Directions
        </h2>

        {directions.map(
          (direction, index) => (
            <input
              key={index}
              value={direction}
              onChange={(e) =>
                updateDirection(
                  index,
                  e.target.value
                )
              }
              placeholder={`Step ${
                index + 1
              }`}
              className="border p-2 block mt-2 w-80"
            />
          )
        )}

        <button
          type="button"
          onClick={addDirection}
          className="border p-2 mt-2"
        >
          Add Step
        </button>

        <h2 className="font-bold mt-6">
          Category
        </h2>

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              e.target.value
            )
          }
          className="border p-2 mt-2 block"
        >
          <option value="">
            Select Category
          </option>

          <option value="1">
            Breakfast
          </option>

          <option value="2">
            Vegetarian
          </option>

          <option value="3">
            Quick & Easy
          </option>

          <option value="4">
            Dessert
          </option>

          <option value="5">
            Dinner
          </option>
        </select>

        <button
          type="submit"
          className="border p-2 mt-6"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
}