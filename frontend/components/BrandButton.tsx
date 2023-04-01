import React from "react";

type BrandButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  type?: "brand" | "normal"
};
function BrandButton({ text, onClick, className, type = "brand" }: BrandButtonProps) {
  if (type == "normal") {
    return (
      <div
        onClick={onClick}
        className={
          `text-black px-5 cursor-pointer drop-shadow-md opacity-60 outline outline-[#666666] 
          hover:opacity-100 py-4  rounded-full transition-all text-center` +
          " " +
          className
        }
      >
        {text}
      </div>
    );
  }
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