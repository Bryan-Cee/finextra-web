import React from "react";
import Select, { type Props, type Options } from "react-select";
import Modal from "./Modal/Modal";
import { Metropolis } from "@/assets/fonts/index";
import {
  Controller,
  type FieldValues,
  type Path,
  type Control,
} from "react-hook-form";

const selectClassName: Props["classNames"] = {
  valueContainer: () => `h-[48px] ${Metropolis.className}`,
  menu: () => `${Metropolis.className}`,
  control: (props) => {
    return `!rounded-sm ${
      props.menuIsOpen || props.isFocused ? "!border-primary" : ""
    }`;
  },
  option: (props) => {
    return `${Metropolis.className} ${
      props.isSelected
        ? "!bg-primary !text-white"
        : "!text-content-primary !py-3 !px-2"
    }`;
  },
  singleValue: () =>
    ` !font-normal !text-content-primary ${Metropolis.className}`,
};

export default function Dropdown<T extends FieldValues>({
  label,
  options,
  control,
  name,
}: {
  label: string;
  name: Path<T>;
  control: Control<T, unknown>;
  options: Options<{ value: string; label: string }>;
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
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            instanceId="react-select-6-live-region"
            classNames={selectClassName}
            options={options}
          />
        )}
      />
    </div>
  );
}

export const AddAccount = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (a: boolean) => void;
}) => {
  return (
    <Modal
      title="Add Account"
      onClose={() => setShowModal(false)}
      show={showModal}
    >
      <div className="flex h-full flex-row items-center justify-center gap-3 text-white"></div>
    </Modal>
  );
};
