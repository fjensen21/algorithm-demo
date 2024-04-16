"use client";
import { GridSquare } from "@/types/types";
import GridCanvas from "./GridCanvas";
import { useState } from "react";

interface GridManagerProps {
  moveHistory: GridSquare[][][];
  displayMoveHistory: () => void;
}

const GridManager: React.FC<GridManagerProps> = ({
  moveHistory,
  displayMoveHistory,
}) => {
  const [grid, setGrid] = useState<GridSquare[][]>(moveHistory[0]);

  return <GridCanvas grid={grid} />;
};

export default GridManager;
