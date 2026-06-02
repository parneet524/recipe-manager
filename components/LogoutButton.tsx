"use client";

export default function LogoutButton() {
  const handleLogout =
    async () => {
      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );

      alert(
        "Logged out!"
      );

      window.location.href =
        "/";
    };

  return (
    <button
      onClick={handleLogout}
      className="border p-2"
    >
      Logout
    </button>
  );
}