import React, { useState } from "react";
import Select from "react-select";
import Modal from "./Modal/Modal";
import { Metropolis } from "@/assets/fonts/index";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const Dropdown = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption: any) => {
    console.log(selectedOption);
  };

  return (
    <div className="mb-2 flex flex-col">
      <label
        className={`font-sans text-sm text-content-secondary ${Metropolis.className}`}
        htmlFor={"react-select-6-live-region"}
      >
        Dropdown
      </label>
      <Select
        instanceId="react-select-6-live-region"
        classNames={{
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
        }}
        options={options}
      />
    </div>
  );
};

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
