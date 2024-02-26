import React from "react";
import "./styles.scss";

interface IModalWrapper {
  isOpen: boolean;
  bodyClassName?: string;
  children: React.ReactNode;
  containerClassName?: string;
  onBackdropClick: () => void;
}

const ModalWrapper: React.FC<IModalWrapper> = (props) => {
  const {
    isOpen,
    children,
    bodyClassName,
    onBackdropClick,
    containerClassName,
  } = props;

  return (
    <>
      {isOpen && (
        <section id="modal-wrapper" className={containerClassName}>
          <div onClick={() => onBackdropClick()}></div>
          <article className={bodyClassName}>{children}</article>
        </section>
      )}
    </>
  );
};

export default ModalWrapper;
