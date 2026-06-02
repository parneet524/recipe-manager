import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "session"
    )?.value;

  if (!token) {
    return Response.json(
      {
        error:
          "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const session =
    await prisma.session.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });

  if (!session) {
    return Response.json(
      {
        error:
          "Invalid session",
      },
      {
        status: 401,
      }
    );
  }

  const recipe =
    await prisma.recipe.create({
      data: {
        title: body.title,
        description:
          body.description,

        user: {
          connect: {
            id: session.user.id,
          },
        },

        ingredients: {
          create: body.ingredients
            .filter(
              (ingredient: string) =>
                ingredient.trim() !== ""
            )
            .map(
              (ingredient: string) => ({
                name: ingredient,
              })
            ),
        },

        directions: {
          create: body.directions
            .filter(
              (direction: string) =>
                direction.trim() !== ""
            )
            .map(
              (direction: string) => ({
                step: direction,
              })
            ),
        },

        categories:
          body.categoryId
            ? {
                connect: [
                  {
                    id: Number(
                      body.categoryId
                    ),
                  },
                ],
              }
            : undefined,
      },

      include: {
        ingredients: true,
        directions: true,
        categories: true,
      },
    });

  return Response.json(recipe);
}