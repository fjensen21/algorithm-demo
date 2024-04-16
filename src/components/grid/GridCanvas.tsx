"use client";
import { GridSquare } from "@/types/types";
import { useEffect, useRef, useState } from "react";

interface GridCanvasProps {
  grid: GridSquare[][];
}

const GridCanvas: React.FC<GridCanvasProps> = ({ grid }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const width = grid[0].length * 175;
  const height = grid.length * 175;

  useEffect(() => {
    const updateCanvasSize = () => {
      const parent = parentRef.current;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const numRows = grid.length;
        const numCols = grid[0].length;
        const cellSize = Math.min(rect.width / numCols, rect.height / numRows);
        const width = numCols * cellSize;
        const height = numRows * cellSize;
        setCanvasSize({ width, height });
      }
    };

    updateCanvasSize();

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [grid]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      drawGrid(ctx);
    }
  });

  // useEffect(() => {
  //   drawGrid(grid);
  // });

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;
    canvas.width = width;
    canvas.height = height;
    // ctx.scale(dpr, dpr); // Scale the context to match the new resolution

    const numRows = grid.length;
    const numCols = grid[0].length;

    // Calculate cell size based on the smaller dimension (width or height)
    const cellSize = Math.min(width / numCols, height / numRows);

    ctx.clearRect(0, 0, width, height);

    const color = {
      0: "rgba(128, 128, 128, 0.2)",
      1: "rgb(30, 150, 10)",
      2: "rgb(200, 30, 10)",
    };

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const squareType = grid[row][col];
        const x = col * cellSize;
        const y = row * cellSize;
        ctx.fillStyle = color[squareType];
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, cellSize, cellSize);
      }
    }
  };

  return (
    <div
      ref={parentRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <canvas
        ref={ref}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></canvas>
    </div>
  );
};

export default GridCanvas;
