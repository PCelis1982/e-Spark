// src/components/ui/button.jsx
export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded border text-white hover:opacity-80 ${className}`}
    >
      {children}
    </button>
  );
}
