import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";
import LogoutButton from "../../components/LogoutButton";

export default async function DashboardPage() {
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
          Access Denied
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
          Access Denied
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome{" "}
        {session.user.email}
      </p>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}