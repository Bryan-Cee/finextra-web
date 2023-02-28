import Link from "next/link";
import React, { useState } from "react";
import { GrCreditCard, GrFormDown, GrMoney } from "react-icons/gr";
import { Button } from "./Button/Button";
import Select, { StylesConfig } from "react-select";
import Modal from "./Modal/Modal";
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
        className="text-sm text-content-secondary"
        htmlFor={"react-select-6-live-region"}
      >
        Dropdown
      </label>
      <Select
        instanceId="react-select-6-live-region"
        classNames={{
          valueContainer: () => "h-[48px] font-body",
          menu: () => "font-body",
          control: (props) => {
            return `!rounded-sm ${
              props.menuIsOpen || props.isFocused ? "!border-primary" : ""
            }`;
          },
          option: (props) => {
            return `!font-body ${
              props.isSelected
                ? "!bg-primary !text-white"
                : "!text-content-primary"
            }`;
          },
          singleValue: () => "!font-body !font-normal !text-content-primary",
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
