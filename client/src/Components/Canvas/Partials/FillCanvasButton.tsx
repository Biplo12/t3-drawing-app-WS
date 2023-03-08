import React from "react";

interface FillCanvasButtonProps {
  color: string;
}

const FillCanvasButton: React.FC<FillCanvasButtonProps> = ({
  color,
}): JSX.Element => {
  return (
    <>
      <button className={`rounded py-2 px-4 font-bold text-white`}>
        Fill Canvas
      </button>
    </>
  );
};
export default FillCanvasButton;
