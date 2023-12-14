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
}

export default function GridContainer() {
  const [grid, setGrid] = useState<Grid | null>(null);

  useEffect(() => setGrid(generateGrid(ROWS, COLS)), []);

  function handleClick() {
    highlightBox(5, 5);
  }

  function highlightBox(row: number, col: number) {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid]; // Create a new copy of the outer array
      newGrid[row] = [...prevGrid[row]]; // Create a new copy of the inner array
      newGrid[row][col] = 1; // Update the desired element
      return newGrid; // Return the new state
    });
  }

  return (
    <div className="container mx-auto m-4">
      <Grid grid={grid} />
      <button onClick={handleClick}>Test Button</button>
    </div>
  );
}
