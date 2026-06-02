import { prisma } from "../../../../lib/prisma";
import EditRecipeForm from "../../../../components/EditRecipeForm";

export default async function EditRecipePage({
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
    });

  if (!recipe) {
    return <h1>Recipe not found</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Edit Recipe
      </h1>

      <EditRecipeForm
        recipe={{
          id: recipe.id,
          title: recipe.title,
          description:
            recipe.description,
        }}
      />
    </div>
  );
}