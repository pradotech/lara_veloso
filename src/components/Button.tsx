import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  id?: string;
  disabled?: boolean;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  type = "button",
  onClick,
  id,
  disabled,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-accent-soft text-brown hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 dark:bg-pink dark:text-dark",
    secondary:
      "bg-surface text-text hover:bg-surface-hover hover:shadow-lg hover:-translate-y-0.5",
    outline:
      "border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent hover:-translate-y-0.5",
  };

  // For primary button in dark theme, use specific classes
  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} id={id} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      id={id}
      disabled={disabled}
      className={`${combinedStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
