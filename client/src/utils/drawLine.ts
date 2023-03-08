type DrawLineProps = Draw & {
  color: string;
};

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  color,
}: DrawLineProps) => {
  const { X: x1, Y: y1 } = currentPoint;
  const width = 5;
  const lineColor = color;

  const startPoint = prevPoint ?? currentPoint;

  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.X, startPoint.Y);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(startPoint.X, startPoint.Y, 2, 0, 2 * Math.PI);
  ctx.fill();
};
