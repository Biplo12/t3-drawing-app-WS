type Draw = {
  prevPoint: Point | null;
  currentPoint: Point;
  ctx: CanvasRenderingContext2D;
};

type Point = {
  X: number;
  Y: number;
};
