import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  FormOptionValue,
  IFormOption,
} from "../../../interfaces/app-form.interface";
import OutsideClickWrapper from "../../outside-click-wrapper";
import "./styles.scss";

interface IAppSelectProps {
  label: string;
  value: FormOptionValue;
  options: IFormOption[];
  onChange: (value: IFormOption) => void;
}

const AppSelect: React.FC<IAppSelectProps> = (props) => {
  const { label, options, value, onChange } = props;

  const [isInitialLoaded, setIsInitialLoaded] = useState(true);

  const [isOpenOption, setIsOpenOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IFormOption>(
    {} as IFormOption
  );

  const handleSelectOption = (value: IFormOption) => {
    setIsOpenOption(false);
    setSelectedOption(value);

    onChange(value);
  };

  const classNameControl = () => {
    const focus = "focus";
    const selected = "selected";
    const defaultClass = "app-select";

    const items: string[] = [];

    items.push(defaultClass);
    if (isOpenOption) items.push(focus);
    if (!!selectedOption.value) items.push(selected);

    return items.join(" ");
  };

  const setInitialOptionValue = () => {
    if (!isInitialLoaded) return;

    const item = options.find((option) => option.value === value);

    if (item) {
      setSelectedOption(item);
      setIsInitialLoaded(false);
    }
  };

  useEffect(() => {
    setInitialOptionValue();
  }, [value]);

  return (
    <OutsideClickWrapper onOutsideClick={() => setIsOpenOption(false)}>
      <article className={classNameControl()}>
        <div onClick={() => setIsOpenOption(!isOpenOption)}>
          <label>{label}</label>
          {!!selectedOption.label && <p>{selectedOption.label}</p>}

          <Icon icon="dashicons:arrow-down" />
          <hr />
        </div>

        {isOpenOption && (
          <ul>
            {options.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(item)}
                className={
                  item.value === selectedOption.value ? "selected" : ""
                }
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </article>
    </OutsideClickWrapper>
  );
};

export default AppSelect;
