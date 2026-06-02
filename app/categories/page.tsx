import { prisma } from "../../lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Categories
      </h1>

      {categories.map((category) => (
        <div
          key={category.id}
          className="border p-3 mt-3"
        >
          {category.name}
        </div>
      ))}
    </div>
  );
}