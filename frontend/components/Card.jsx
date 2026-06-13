export default function Card({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border">
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}