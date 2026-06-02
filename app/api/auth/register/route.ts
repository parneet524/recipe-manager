import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

  if (existingUser) {
    return Response.json(
      {
        error:
          "User already exists",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      body.password,
      10
    );

  const user =
    await prisma.user.create({
      data: {
        email: body.email,
        password:
          hashedPassword,
      },
    });

  return Response.json(user);
}