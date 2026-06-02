import { prisma } from "../../../lib/prisma";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category =
    await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        recipes: true,
      },
    });

  if (!category) {
    return <h1>Category not found</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {category.name}
      </h1>

      <h2 className="mt-4 font-bold">
        Recipes
      </h2>

      {category.recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border p-3 mt-3"
        >
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}