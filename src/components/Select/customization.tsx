import { cn } from "@/utils/cn";
import { ChevronDown, X } from "lucide-react";
import {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  components,
} from "react-select";

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown
        size={18}
        className={cn(
          "transition-all duration-200",
          props.isFocused && "stroke-primary"
        )}
      />
    </components.DropdownIndicator>
  );
};

export const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X size={18} />
    </components.ClearIndicator>
  );
};

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X size={14} />
    </components.MultiValueRemove>
  );
};
