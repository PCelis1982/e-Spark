export function Card({ children, className }) {
  return <div className={`rounded-lg shadow bg-[#111] p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}