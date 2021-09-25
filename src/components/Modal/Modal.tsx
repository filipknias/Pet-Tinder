import React from 'react';
import "./modal.scss";

interface Props {
  children: React.ReactChild;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties;
  header?: string;
};

const Modal: React.FC<Props> = ({ children, open, setOpen, style, header }) => {
  const MODAL_OVERLAY_ID = "modalOverlay";
  const handleClickOutsideModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.target as Element;
    if (id === MODAL_OVERLAY_ID) {
      setOpen(false);
    }
  }; 

  return (
    <div 
      className={`modal ${open ? "modal--open" : ""}`} 
      id={MODAL_OVERLAY_ID} 
      onClick={(e) => handleClickOutsideModal(e)}
    >
      <div className="modal__container" style={style}>
          {header && <h1 className="modal__container__header">{header}</h1>}
          {children}
      </div>
    </div>
  )
}

export default Modal;
