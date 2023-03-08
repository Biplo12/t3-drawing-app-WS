import React from "react";
import { io } from "socket.io-client";

interface ClearCanvasButtonProps {
  color: string;
}

const socket = io("http://localhost:5000");

const ClearCanvasButton: React.FC<ClearCanvasButtonProps> = ({
  color,
}): JSX.Element => {
  return (
    <>
      <button
        className={`rounded py-2 px-4 font-bold text-white`}
        style={{
          backgroundColor: color,
          color: color == "#000000" ? "#ffffff" : "#000000",
        }}
        onClick={() => socket.emit("clear-canvas")}
      >
        Clear Canvas
      </button>
    </>
  );
};
export default ClearCanvasButton;
