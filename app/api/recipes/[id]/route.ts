import { prisma } from "../../../../lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();

  const { id } = await params;

  const recipe =
    await prisma.recipe.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

  return Response.json(recipe);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.ingredient.deleteMany({
    where: {
      recipeId: Number(id),
    },
  });

  await prisma.direction.deleteMany({
    where: {
      recipeId: Number(id),
    },
  });

  await prisma.recipe.delete({
    where: {
      id: Number(id),
    },
  });

  return Response.json({
    success: true,
  });
}