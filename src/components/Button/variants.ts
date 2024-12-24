import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  slots: {
    icon: "size-4",
    base: [
      "text-white",
      "text-nowrap",
      "text-base",
      "min-w-fit",
      "px-4",
      "py-2",
      "h-fit",
      "relative",
      "overflow-hidden",
      "rounded-md",
      "transition-colors",
      "duration-200",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed",
      "flex",
      "justify-center",
      "items-center",
      "select-none",
      "outline-none",
      "focus:ring-2",
      "focus:ring-offset-2",
      "dark:ring-offset-background",
      "disabled:pointer-events-none",
    ],
  },
  variants: {
    color: {
      primary: "focus:ring-primary",
      secondary: "focus:ring-secondary",
      success: "focus:ring-success",
      warning: "focus:ring-warning",
      error: "focus:ring-error",
      info: "focus:ring-info",
    },
    size: {
      sm: {
        icon: "size-3",
        base: "px-4 py-3 text-sm",
      },
      md: {
        icon: "size-4",
        base: "px-4 py-4 text-sm",
      },
      lg: {
        icon: "size-5",
        base: "px-6 py-5 text-md",
      },
    },
    variant: {
      outline: "",
      solid: "",
      ghost: {
        base: [
          "bg-white",
          "bg-opacity-5",
          "text-white",
          "hover:bg-opacity-15",
          "active:bg-opacity-25",
          "focus:ring-gray-300",
        ],
      },
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "solid",
      class: {
        base: [
          "bg-primary",
          "text-white",
          "hover:bg-primary-700",
          "active:bg-primary-800",
        ],
      },
    },
    {
      color: "primary",
      variant: "outline",
      class: {
        base: [
          "shadow-border-primary",
          "text-primary",
          "hover:bg-primary",
          "hover:text-white",
          "active:bg-primary-700",
        ],
      },
    },
    {
      color: "secondary",
      variant: "solid",
      class: {
        base: [
          "bg-secondary",
          "text-white",
          "hover:bg-secondary-700",
          "active:bg-secondary-800",
        ],
      },
    },
    {
      color: "secondary",
      variant: "outline",
      class: {
        base: [
          "shadow-border-secondary",
          "text-secondary",
          "hover:bg-secondary",
          "hover:text-white",
          "active:bg-secondary-700",
        ],
      },
    },
    {
      color: "success",
      variant: "solid",
      class: {
        base: [
          "bg-success",
          "text-white",
          "hover:bg-success-700",
          "active:bg-success-800",
        ],
      },
    },
    {
      color: "success",
      variant: "outline",
      class: {
        base: [
          "shadow-border-success",
          "text-success",
          "hover:bg-success",
          "hover:text-white",
          "active:bg-success-700",
        ],
      },
    },
    {
      color: "warning",
      variant: "solid",
      class: {
        base: [
          "bg-warning",
          "text-white",
          "hover:bg-warning-700",
          "active:bg-warning-800",
        ],
      },
    },
    {
      color: "warning",
      variant: "outline",
      class: {
        base: [
          "shadow-border-warning",
          "text-warning",
          "hover:bg-warning",
          "hover:text-white",
          "active:bg-warning-700",
        ],
      },
    },
    {
      color: "error",
      variant: "solid",
      class: {
        base: [
          "bg-error",
          "text-white",
          "hover:bg-error-700",
          "active:bg-error-800",
        ],
      },
    },
    {
      color: "error",
      variant: "outline",
      class: {
        base: [
          "shadow-border-error",
          "text-error",
          "hover:bg-error",
          "hover:text-white",
          "active:bg-error-700",
        ],
      },
    },
    {
      color: "info",
      variant: "solid",
      class: {
        base: [
          "bg-info",
          "text-white",
          "hover:bg-info-700",
          "active:bg-info-800",
        ],
      },
    },
    {
      color: "info",
      variant: "outline",
      class: {
        base: [
          "shadow-border-info",
          "text-info",
          "hover:bg-info",
          "hover:text-white",
          "active:bg-info-700",
        ],
      },
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "primary",
  },
});
