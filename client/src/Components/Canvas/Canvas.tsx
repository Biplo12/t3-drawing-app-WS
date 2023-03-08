import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDraw } from "~/hooks/useDraw";
import { drawLine } from "~/utils/drawLine";
import ColorPickerComponent from "../ColorPicker/ColorPickerComponent";
import ClearCanvasButton from "./Partials/ClearCanvasButton";
import FillCanvasButton from "./Partials/FillCanvasButton";

// const socket = io("http://localhost:5000");
const socket = io("https://drawing-app-server.glitch.me");

type DrawLinesProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
};

const Canvas: React.FC = (): JSX.Element => {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown } = useDraw(createLine);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit("client-ready");

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL) return;
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
      };
    });

    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color }: DrawLinesProps) => {
        if (!ctx) return;
        drawLine({ prevPoint, currentPoint, ctx, color });
      }
    );

    socket.on("clear-canvas", () => {
      clearCanvas();
    });

    return () => {
      socket.off("draw-line");
      socket.off("clear-canvas");
      socket.off("canvas-state-from-server");
      socket.off("get-canvas-ready");
    };
  }, [canvasRef, clearCanvas]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, ctx, color });
    drawLine({ prevPoint, currentPoint, ctx, color });
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    context?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
  }

  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center justify-center gap-5">
        <ColorPickerComponent setColor={setColor} color={color} />
        <ClearCanvasButton color={color} />
        <FillCanvasButton />
      </div>
      <canvas
        width={700}
        height={700}
        className="border border-white"
        ref={canvasRef}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};
export default Canvas;
