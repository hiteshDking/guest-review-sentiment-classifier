/**
 * Toast Component
 * Props:
 * message
 */

export default function Toast({ message }) {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
      {message}
    </div>
  );
}