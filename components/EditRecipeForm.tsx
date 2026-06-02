"use client";

import { useState } from "react";

export default function EditRecipeForm({
  recipe,
}: {
  recipe: {
    id: number;
    title: string;
    description: string;
  };
}) {
  const [title, setTitle] =
    useState(recipe.title);

  const [description, setDescription] =
    useState(recipe.description);

  const handleSave = async () => {
    const response = await fetch(
      `/api/recipes/${recipe.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }
    );

    if (response.ok) {
      alert("Recipe updated!");
    } else {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      "Delete this recipe?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/recipes/${recipe.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Recipe deleted!");

      window.location.href =
        "/recipes";
    } else {
      alert("Delete failed");
    }
  };

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="border p-2 block mt-4 w-80"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="border p-2 block mt-4 w-80 h-24"
      />

      <button
        onClick={handleSave}
        className="border p-2 mt-4 mr-4"
      >
        Save Changes
      </button>

      <button
        onClick={handleDelete}
        className="border p-2 mt-4"
      >
        Delete Recipe
      </button>
    </>
  );
}