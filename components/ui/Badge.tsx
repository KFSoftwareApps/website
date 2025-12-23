import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "border-transparent bg-primary-600 text-white hover:bg-primary-700",
    secondary: "border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-200",
    outline: "text-foreground",
    success: "border-transparent bg-green-100 text-green-700",
    warning: "border-transparent bg-yellow-100 text-yellow-800",
  };

  return <div className={cn(baseStyles, variants[variant], className)} {...props} />;
}

export { Badge };
