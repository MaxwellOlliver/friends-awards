import { tv } from "tailwind-variants";

export const inputVariants = tv({
  slots: {
    control: [
      "flex",
      "items-center",
      "w-full",
      "h-fit",
      "px-4",
      "dark:bg-[#ffffff13]",
      "bg-[#00000010]",
      "duration-200",
      "rounded-md",
      "ring-primary",
      "focus-within:ring-2",
      "transition-all",
    ],
    input: [
      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none text-sm py-3 placeholder:text-gray-500 w-full text-sm no-arrow mx-0.5 transition-colors duration-200 bg-transparent",
    ],
  },
  variants: {
    formState: {
      isError: {
        control: ["ring-error", "ring-1"],
      },
      isSuccess: {
        control: ["focus-within:ring-success"],
      },
    },
  },
});
