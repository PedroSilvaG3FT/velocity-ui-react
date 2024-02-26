import React, { useEffect, useRef, useState } from "react";

interface IOutsideClickWrapperProps {
  onOutsideClick: () => void;
  children: React.ReactNode;
}

const OutsideClickWrapper: React.FC<IOutsideClickWrapperProps> = ({
  onOutsideClick,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isInside, setIsInside] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsInside(false);
        onOutsideClick();
      } else {
        setIsInside(true);
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
