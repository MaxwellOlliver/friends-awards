import { tv } from "tailwind-variants";

export const inputVariants = tv({
  slots: {
    control: [
      "flex",
      "items-center",
      "w-full",
      "h-fit",
      "text-base",
      "px-4",
      "dark:bg-[#ffffff13]",
      "bg-[#00000010]",
      "duration-200",
      "rounded-md",
      "ring-primary",
      "focus-within:ring-2",
    ],
    input: [
      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none py-4 placeholder:text-gray-500 w-full text-base no-arrow mx-0.5 transition-colors duration-200 bg-transparent",
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
