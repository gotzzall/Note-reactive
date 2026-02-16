import { useState } from "react";
import { useRef } from "react";

export const Modal = ({ title, Button, children }) => {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {Button(() => {
        dialogRef.current.showModal();
        setIsOpen(true);
      })}
      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          {isOpen &&
            children(() => {
              dialogRef.current.close();
              setIsOpen(false);
            })}
        </div>
      </dialog>
    </>
  );
};
