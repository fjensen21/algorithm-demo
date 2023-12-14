"use client";
import { useState, useEffect } from "react";
import Grid from "@/components/Grid";

const ROWS = 40;
const COLS = 50;

export type Grid = [number, number][];

function generateGrid(rows: number, cols: number): Grid {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const gridRow = [];
    for (let col = 0; col < cols; col++) {
      gridRow.push(0);
    }
    grid.push(gridRow);
  }
  return grid;
};

export default function GridContainer() {
  const [grid, setGrid] = useState<Grid | null>(null);

  useEffect(() => setGrid(generateGrid(ROWS, COLS)), []);

  return (
    <div className="container mx-auto outline bg-gray-200 m-4">
      <Grid grid={grid} />
    </div>
  );
}
