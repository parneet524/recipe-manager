import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const user =
    await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 401 }
    );
  }

  const validPassword =
    await bcrypt.compare(
      body.password,
      user.password
    );

  if (!validPassword) {
    return Response.json(
      {
        error:
          "Invalid password",
      },
      { status: 401 }
    );
  }

  const token =
    randomUUID();

  await prisma.session.create({
    data: {
      token,
      userId: user.id,
    },
  });

  const response =
    Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  response.headers.append(
    "Set-Cookie",
    `session=${token}; Path=/; HttpOnly`
  );

  return response;
}