type RecipeCardProps = {
  title: string;
  description: string;
  onDelete: () => void;
};

export default function RecipeCard({
  title,
  description,
  onDelete,
}: RecipeCardProps) {
  return (
    <div className="border p-4 mt-4 rounded">
      <h3 className="font-bold text-xl">
        {title}
      </h3>

      <p>{description}</p>

      <button
        onClick={onDelete}
        className="border px-2 mt-2"
      >
        Delete
      </button>
    </div>
  );
}