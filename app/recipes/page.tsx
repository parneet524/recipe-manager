import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany({
    include: {
      user: true,
      ingredients: true,
      directions: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        All Recipes
      </h1>

      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border p-4 mt-4"
        >
          <Link href={`/recipes/${recipe.id}`}>
            <h2 className="font-bold text-xl underline cursor-pointer">
              {recipe.title}
            </h2>
          </Link>

          <p>{recipe.description}</p>

          <p className="mt-2">
            Author: {recipe.user.email}
          </p>

          <h3 className="font-bold mt-3">
            Ingredients
          </h3>

          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name}
              </li>
            ))}
          </ul>

          <h3 className="font-bold mt-3">
            Directions
          </h3>

          <ol>
            {recipe.directions.map((direction) => (
              <li key={direction.id}>
                {direction.step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}