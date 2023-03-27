import React, { type ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";

const Modal = ({
  children,
  show,
  onClose,
  title = "Modal",
}: {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="absolute inset-0 flex h-screen  flex-col items-center justify-center bg-black bg-opacity-50">
      <div className="h-1/2 w-10/12 max-w-lg rounded-md bg-slate-200">
        <div className="flex h-14 items-center justify-between rounded-t bg-gray-200">
          <p className="ml-4 font-body text-lg font-semibold text-content-primary">
            {title}
          </p>
          <button className="h-fit py-2 px-3" onClick={handleCloseClick}>
            <GrClose className="text-content-accent" size={24} />
          </button>
        </div>
        <div className="h-[calc(100%-56px)] p-4">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") ?? document.body
    );
  } else {
    return null;
  }
};

export default Modal;
