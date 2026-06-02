import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "session"
    )?.value;

  if (!token) {
    return Response.json(
      {
        user: null,
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
        user: null,
      }
    );
  }

  return Response.json({
    user: {
      id: session.user.id,
      email:
        session.user.email,
    },
  });
}