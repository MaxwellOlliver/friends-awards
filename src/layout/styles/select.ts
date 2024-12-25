import { cn } from "@/utils/cn";
import { ClassNamesConfig, GroupBase, Props } from "react-select";

export const selectClassNames: (props: {
  error: boolean;
}) => ClassNamesConfig<unknown, boolean, GroupBase<unknown>> = ({ error }) => ({
  control: (props) =>
    cn(
      "border border-gray-300 px-3 py-2 rounded-md text-sm w-full hover:border-gray-400 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
      props.isFocused && "border-primary",
      props.isDisabled && "pointer-events-none bg-gray-100",
      error &&
        !props.isDisabled &&
        "border-error hover:border-error focus-within:ring-error focus-within:border-error focus-within:hover:border-error"
    ),
  clearIndicator: () => "text-gray-400",
  dropdownIndicator: () => "text-gray-400",
  option: ({ isFocused, isSelected }) =>
    cn(
      "cursor-pointer p-2 transition-colors duration-200",
      isFocused && "bg-primary-100",
      isSelected && "bg-primary-600 text-white"
    ),
  noOptionsMessage: () => "text-gray-400 mx-2 my-3 font-normal",
  menu: () =>
    "border mt-1 border-gray-300 rounded-md shadow-md z-10 bg-white overflow-hidden text-sm ",
  groupHeading: () => "text-sm text-gray-500 font-medium px-2 py-1 font-normal",
  group: () => "py-1 last:rounded-b-md",
  placeholder: () => "text-gray-400",
  multiValue: () => "bg-primary-100 rounded-md px-1",
  multiValueRemove: () => "cursor-pointer ml-1",
  valueContainer: () => "gap-1",
  loadingIndicator: () => "text-primary",
  menuList: () =>
    "scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-200",
  loadingMessage: () => "py-2",
});

export const selectStyles: Props["styles"] = {
  input: (base) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),
  menuList: (base) => ({
    ...base,
    scrollbarWidth: "thin",
  }),
};
