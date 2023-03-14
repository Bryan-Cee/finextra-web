import { Metropolis } from "@/assets/fonts";
import {
  type UseControllerProps,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { DatePicker as DatePickerInput } from "react-widgets";

export default function DatePicker<T extends FieldValues>({
  label,
  control,
  name,
}: {
  label: string;
  name: Path<T>;
  control: UseControllerProps<T>["control"];
}) {
  return (
    <div className="mb-2 flex flex-col">
      <label
        className={`font-sans text-sm text-content-secondary ${Metropolis.className}`}
        htmlFor={"react-select-6-live-region"}
      >
        {label}
      </label>
      <Controller
        name={name}
        rules={{ required: true }}
        control={control}
        render={({ field }) => (
          <DatePickerInput
            {...field}
            id="createdAt"
            className="h-[50px]"
            valueFormat={{ dateStyle: "medium" }}
          />
        )}
      />
    </div>
  );
}
