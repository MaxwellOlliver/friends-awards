import { tv } from "tailwind-variants";

export const tooltipVariants = tv({
  base: [
    "tooltip-text",
    "absolute",
    "bg-neutral-700",
    "text-white",
    "text-sm",
    "rounded-md",
    "z-10",
    "opacity-0",
    "group-hover:opacity-100",
    "transition-opacity",
    "pointer-events-none",
    "flex",
    "min-w-0",
    "w-max",
    "max-w-64",
  ],
  variants: {
    position: {
      top: [
        "bottom-full",
        "mb-2",
        "left-1/2",
        "-translate-x-1/2",
        "[&_.tooltip-arrow]:bottom-[-0.25rem]",
        "[&_.tooltip-arrow]:left-1/2",
      ],
      left: [
        "right-full",
        "mr-2",
        "top-1/2",
        "-translate-y-1/2",
        "[&_.tooltip-arrow]:right-[-0.25rem]",
        "[&_.tooltip-arrow]:top-1/2",
      ],
      right: [
        "left-full",
        "ml-2",
        "top-1/2",
        "-translate-y-1/2",
        "[&_.tooltip-arrow]:left-[-0.25rem]",
        "[&_.tooltip-arrow]:top-1/2",
      ],
      bottom: [
        "top-full",
        "mt-2",
        "left-1/2",
        "-translate-x-1/2",
        "[&_.tooltip-arrow]:top-[-0.25rem]",
        "[&_.tooltip-arrow]:left-1/2",
      ],
    },
  },
});
