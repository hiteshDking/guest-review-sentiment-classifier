/**
 * Button Component
 * Props:
 * variant - primary | secondary | outline
 * size - sm | md | lg
 * disabled - boolean
 * onClick - function
 */

export default function Button({
  children,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {children}
    </button>
  );
}