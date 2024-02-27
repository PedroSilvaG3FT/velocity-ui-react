import React, { InputHTMLAttributes } from "react";

import "./styles.scss";

interface IAppInput extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label: string;
  containerClassname?: string;
  onValueChange: (value: string) => void;
}

const AppInput: React.FC<IAppInput> = (props) => {
  const {
    label,
    value,
    onValueChange,
    type = "text",
    placeholder = "",
    containerClassname = "",
    ...rest
  } = props;

  const placeholderControl = !value ? placeholder : "";

  const classNameControl = () => {
    const filled = "filled";
    const defaultClass = "app-input";

    const items: string[] = [];

    items.push(defaultClass);
    items.push(containerClassname);
    if (!!value) items.push(filled);

    return items.join(" ");
  };

  return (
    <div className={classNameControl()}>
      <label>{label}</label>
      <input
        {...rest}
        placeholder={placeholderControl}
        onChange={(event) => onValueChange(event.target.value)}
      />
    </div>
  );
};

export default AppInput;
