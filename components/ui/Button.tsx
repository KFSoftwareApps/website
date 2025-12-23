import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg",
      secondary: "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 hover:shadow-md",
      outline:
        "border border-input bg-background hover:bg-secondary-100 hover:text-secondary-900 hover:border-secondary-300 hover:shadow-sm",
      ghost: "hover:bg-secondary-100 hover:text-secondary-900",
      danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg",
    };

    const sizes = {
      sm: "h-9 rounded-md px-3",
      md: "h-10 px-4 py-2",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
