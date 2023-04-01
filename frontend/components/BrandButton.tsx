import React from "react";

type BrandButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};
function BrandButton({ text, onClick, className }: BrandButtonProps) {
  return (
    <div
      onClick={onClick}
      className={
        `brand-gradient px-5 cursor-pointer drop-shadow-md opacity-90 hover:outline hover:outline-blue-300
         py-4 text-white rounded-full hover:opacity-100 transition-all text-center` +
        " " +
        className
      }
    >
      {text}
    </div>
  );
}

export default BrandButton;