import { cn } from "@/utils/cn";
import { ClassNamesConfig, GroupBase, Props } from "react-select";

export const selectClassNames: (props: {
  error: boolean;
}) => ClassNamesConfig<unknown, boolean, GroupBase<unknown>> = ({ error }) => ({
  control: (props) =>
    cn(
      "px-5 py-3 rounded-md text-sm w-full focus-within:ring-2 focus-within:ring-primary bg-[#ffffff13] ",
      props.isDisabled && "pointer-events-none opacity-50",
      error && !props.isDisabled && "focus-within:ring-error ring-error ring-1"
    ),
  clearIndicator: () => "text-gray-400",
  dropdownIndicator: () => "text-gray-400",
  option: ({ isFocused, isSelected }) =>
    cn(
      "cursor-pointer p-4 transition-colors duration-200 hover:bg-[#ffffff13] cursor-pointer",
      isFocused && "bg-[#ffffff13] text-white",
      isSelected && "bg-primary text-white hover:bg-primary"
    ),
  noOptionsMessage: () => "text-gray-400 mx-2 my-3 font-normal",
  menu: () =>
    "mt-2 rounded-md shadow-md z-10 bg-[#302f2f] overflow-hidden text-sm",
  groupHeading: () => "text-sm text-gray-500 font-medium px-2 py-1 font-normal",
  group: () => "py-1 last:rounded-b-md",
  placeholder: () => "text-gray-500 text-sm",
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
