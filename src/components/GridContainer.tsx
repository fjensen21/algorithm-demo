"use client";
import { useState, useEffect } from "react";
import Grid from "@/components/Grid";

const ROWS = 40;
const COLS = 50;

const generateGrid = (rows: number, cols: number) => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const gridRow: number[] = [];
    for (let col = 0; col < cols; col++) {
      gridRow.push(0);
    }
    grid.push(gridRow);
  }
  console.log(grid);
  return grid;
};

export default function GridContainer() {
  const [grid, setGrid] = useState(null);

  useEffect(() => setGrid(generateGrid(ROWS, COLS)), []);

  return (
    <div className="container mx-auto outline bg-gray-200 m-4">
      <Grid grid={grid} />
    </div>
  );
}
