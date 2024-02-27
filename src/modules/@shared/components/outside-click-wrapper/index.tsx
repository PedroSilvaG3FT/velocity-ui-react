import React, { useEffect, useRef } from "react";

interface IOutsideClickWrapperProps {
  onOutsideClick: () => void;
  children: React.ReactNode;
}

const OutsideClickWrapper: React.FC<IOutsideClickWrapperProps> = ({
  onOutsideClick,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickWrapper;
