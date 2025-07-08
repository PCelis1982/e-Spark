export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border border-gray-300 rounded bg-white text-black ${className}`}
    />
  );
}
