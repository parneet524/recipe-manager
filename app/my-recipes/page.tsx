import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function MyRecipesPage() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "session"
    )?.value;

  if (!token) {
    return (
      <div className="p-6">
        <h1>
          Please log in
        </h1>
      </div>
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
    return (
      <div className="p-6">
        <h1>
          Please log in
        </h1>
      </div>
    );
  }

  const recipes =
    await prisma.recipe.findMany({
      where: {
        userId:
          session.user.id,
      },
    });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        My Recipes
      </h1>

      {recipes.length === 0 ? (
        <p className="mt-4">
          No recipes found.
        </p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-4 mt-4"
          >
            <Link
              href={`/recipes/${recipe.id}`}
            >
              <h2 className="font-bold text-xl underline">
                {recipe.title}
              </h2>
            </Link>

            <p>
              {recipe.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
}