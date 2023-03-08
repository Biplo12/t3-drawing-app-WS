const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const allowedOrigins = [
  "http://localhost:3000",
  "https://t3-drawing-app-ws.vercel.app",
];

const app = express();

const server = http.createServer(app);

app.use(cors({ origin: allowedOrigins }));

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
  },
});

interface Point {
  x: number;
  y: number;
}

interface DrawLine {
  prevPoint: Point | null;
  currentPoint: Point | null;
  color: string;
}

io.on("connection", (socket: any) => {
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
