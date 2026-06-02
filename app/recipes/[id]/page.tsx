import { prisma } from "../../../lib/prisma";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe =
    await prisma.recipe.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        ingredients: true,
        directions: true,
      },
    });

  if (!recipe) {
    return <h1>Recipe not found</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {recipe.title}
      </h1>

      <p className="mt-2">
        {recipe.description}
      </p>

      <p className="mt-2">
        Author: {recipe.user.email}
      </p>

      <h2 className="font-bold mt-4">
        Ingredients
      </h2>

      <ul>
        {recipe.ingredients.map(
          (ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name}
            </li>
          )
        )}
      </ul>

      <h2 className="font-bold mt-4">
        Directions
      </h2>

      <ol>
        {recipe.directions.map(
          (direction) => (
            <li key={direction.id}>
              {direction.step}
            </li>
          )
        )}
      </ol>

      <a
        href={`/recipes/${recipe.id}/edit`}
        className="border p-2 inline-block mt-4"
      >
        Edit Recipe
      </a>
    </div>
  );
}