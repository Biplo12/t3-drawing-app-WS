import { useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = () => {
    setMouseDown(true);
  };

  const drawHandler = (e: MouseEvent) => {
    if (!mouseDown) return;
    const currentPoint = findCurrentPoint(e);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !currentPoint) {
      console.log("ctx is null");
      return;
    }

    onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
    prevPoint.current = currentPoint;
  };

  const findCurrentPoint = (e: MouseEvent) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (!canvas) {
      console.log("canvas is null");
      return;
    }

    const rectangle = canvas.getBoundingClientRect();
    const X = e.clientX - rectangle.left;
    const Y = e.clientY - rectangle.top;

    return { X, Y };
  };

  const mouseUpHandler = () => {
    setMouseDown(false);
    prevPoint.current = null;
  };

  useEffect(() => {
    canvasRef.current?.addEventListener("mousemove", drawHandler);
    canvasRef.current?.addEventListener("mouseup", mouseUpHandler);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasRef.current?.removeEventListener("mousemove", drawHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDraw]);

  return { canvasRef, onMouseDown };
};
