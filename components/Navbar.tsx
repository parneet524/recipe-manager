import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";

export default async function Navbar() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "session"
    )?.value;

  let isLoggedIn = false;

  if (token) {
    const session =
      await prisma.session.findUnique({
        where: {
          token,
        },
      });

    if (session) {
      isLoggedIn = true;
    }
  }

  return (
    <div className="p-4 border-b flex gap-4">
      <Link href="/">
        Home
      </Link>

      <Link href="/about">
        About
      </Link>

      <Link href="/recipes">
        Recipes
      </Link>

      {!isLoggedIn && (
        <>
          <Link href="/register">
            Register
          </Link>

          <Link href="/login">
            Login
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link href="/my-recipes">
            My Recipes
          </Link>

          <Link href="/recipes/new">
            New Recipe
          </Link>

          <Link href="/dashboard">
            Dashboard
          </Link>
        </>
      )}
    </div>
  );
}