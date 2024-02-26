import React, { useState } from "react";

import AppInput from "../../../@shared/components/form/app-input";
import ModalWrapper from "../../../@shared/components/modal-wrapper";
import "./styles.scss";

interface IModalSubject {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const ModalSubject: React.FC<IModalSubject> = (props) => {
  const { open, onClose, onSubmit } = props;

  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  return (
    <ModalWrapper isOpen={open} onBackdropClick={() => onClose()}>
      <section id="modal-subject">
        <h2>Please enter a subject title</h2>

        <AppInput
          value={value}
          label="Subject"
          placeholder="Placeholder"
          onValueChange={(event) => setValue(event)}
        />

        <footer>
          <button onClick={() => onClose()}>Close</button>
          <button className="btn-primary !h-11 w-24" onClick={handleSubmit}>
            Submit
          </button>
        </footer>
      </section>
    </ModalWrapper>
  );
};

export default ModalSubject;
