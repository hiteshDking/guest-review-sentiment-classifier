export default function Card({ title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border">
      <h3 className="text-xl font-semibold mb-2 dark:text-white">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}