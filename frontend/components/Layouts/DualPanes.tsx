import React from "react";

type DualPanesProps = {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
};

function DualPanes({ leftPane, rightPane }: DualPanesProps) {
  return (
    <div className="w-full h-full flex">
      <div className="w-[25%]">{leftPane}</div>
      <div className="w-[100%]">{rightPane}</div>
    </div>
  );
}

export default DualPanes;
