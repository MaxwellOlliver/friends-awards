import { selectClassNames, selectStyles } from "@/layout/styles/select";
import RcSelect from "react-select";
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
} from "./customization";
import { FormField } from "../_internal/FormField";
import { forwardRef, useId } from "react";
import { Control, Controller, RefCallBack } from "react-hook-form";
export interface SelectProps extends React.ComponentProps<typeof RcSelect> {
  label?: string;
  error?: string;
  required?: boolean;
  ref?: RefCallBack;
}

const SelectComponent = forwardRef<
  React.ComponentProps<typeof RcSelect>["ref"],
  SelectProps
>(function SelectComponent(
  { label, error, className, required, ...props }: SelectProps,
  ref
) {
  const hookId = useId();
  const id = props.id ?? hookId;

  return (
    <FormField
      id={id}
      label={label}
      error={error}
      className={className}
      required={required}
    >
      <RcSelect
        {...props}
        inputId={id}
        unstyled
        noOptionsMessage={() => "Nenhuma opção..."}
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
          ClearIndicator,
          MultiValueRemove,
        }}
        placeholder={props.placeholder ?? "Selecione..."}
        classNames={selectClassNames({ error: !!error })}
        styles={selectStyles}
        ref={ref as React.ComponentProps<typeof RcSelect>["ref"]}
      />
    </FormField>
  );
});

export const Select = ({
  control,
  ...props
}: SelectProps & { control?: Control<any, any> }) => {
  return control && props.name ? (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => <SelectComponent {...field} {...props} />}
    />
  ) : (
    <SelectComponent {...props} />
  );
};
