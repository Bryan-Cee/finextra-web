import React from 'react';
import { GrTrash } from 'react-icons/gr';
import { Button } from '../Button/Button';

interface UploadInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  size?: number;
}

const UploadInput = ({
  onChange,
  disabled,
  label,
  type,
  id,
  size,
  accept,
}: UploadInputProps) => {
  return (
    <div className={`flex flex-row gap-2 mt-2 w-full`}>
      <div className="max-w-xs font-semibold flex-1 flex px-6 py-2 justify-center items-center bg-content-primary text-white rounded-[3px]">
        <label className="" htmlFor={id}>
          {label}
        </label>
        <input
          style={{
            width: 0,
            visibility: 'hidden',
          }}
          type={type}
          id={id}
          accept={accept}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      <div className={`max-w-xs `}>
        <Button
          className="flex h-full flex-row gap-4 justify-center"
          bgColor="bg-interactive-negative"
          onClick={() => {
            console.log('clicked');
          }}
        >
          <GrTrash size={16} />
        </Button>
      </div>
    </div>
  );
};

export default UploadInput;
