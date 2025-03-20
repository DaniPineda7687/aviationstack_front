import React, { JSX } from "react";

export interface TitleProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: "default" | "small" | "large" | "medium";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({
  as: Component = "h1",
  variant = "default",
  onClick,
  className = "",
  children,
}) => {
  let variantClasses = "";

  switch (variant) {
    case "small":
      variantClasses = "text-xl sm:text-2xl md:text-2xl";
      break;
    case "large":
      variantClasses = "text-4xl sm:text-5xl md:text-6xl";
      break;
    case "medium":
      variantClasses = "text-2xl sm:text-4xl md:text-4xl";
      break;
    default:
      variantClasses = "text-2xl sm:text-4xl md:text-4xl";
  }

  const baseClasses =
    "cursor-pointer font-extrabold bg-gradient-to-r from-[#006AFF] to-[#00F9FF] bg-clip-text text-transparent";

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{ backgroundSize: "600%", backgroundPosition: "center" }}
    >
      {children}
    </Component>
  );
};

export default Title;
