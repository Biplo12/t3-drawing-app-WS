import React from "react";
import Canvas from "./Canvas/Canvas";
const Wrapper: React.FC = (): JSX.Element => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0F162B]">
      <Canvas />
    </div>
  );
};
export default Wrapper;
