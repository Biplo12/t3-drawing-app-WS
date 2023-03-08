import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "next-drawing-gv1k0lu3r-biplo12.vercel.app",
];

const app = express();

const server = http.createServer(app);

app.use(cors({ origin: allowedOrigins }));

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
  },
});

type Point = {
  x: number;
  y: number;
};

type DrawLine = {
  prevPoint: Point | null;
  currentPoint: Point | null;
  color: string;
};

io.on("connection", (socket) => {
  socket.on("client-ready", () => {
    socket.broadcast.emit("get-canvas-state");
  });

  socket.on("canvas-state", (canvasState: string) => {
    socket.broadcast.emit("canvas-state-from-server", canvasState);
  });

  socket.on("draw-line", ({ prevPoint, currentPoint, color }: DrawLine) => {
    socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
  });

  socket.on("clear-canvas", () => io.emit("clear-canvas"));
});

server.listen(5000, () => {
  console.log("Server started on port 3001");
});
