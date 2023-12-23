"use client";
import { useState, useEffect } from "react";
import PerformanceData from "./PerformanceData";
import Grid from "@/components/Grid";
import { solveProblem, getNewProblemSpace } from "@/services/gridApiServices";
import type { FormEvent } from "react";
import { GridSquare } from "../types/types";

const GridContainer: React.FC = () => {
  const [gridArray, setGridArray] = useState<GridSquare[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [running, setRunning] = useState(false);

  const [availableAlgorithms, setAvailableAlgorithms] = useState<string[]>([
    "Algorithm 1",
    "Algorithm 2",
  ]);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    availableAlgorithms[0]
  );

  const [performance, setPerformance] = useState(null);

  const displayMoveHistory = async (moveHistory: GridSquare[][][]) => {
    const sleep = (delay: number) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    for (let i = 0; i < moveHistory.length; i++) {
      await sleep(200);
      setGridArray(moveHistory[i]);
    }
  };

  const handleGenerateProblemSpace = () => {
    const fetchAndSetData = async () => {
      try {
        const gridData = await getNewProblemSpace();
        setGridArray(gridData);
      } catch (error) {
        console.error("Error setting state:", error);
      }
    };

    fetchAndSetData();
  };

  useEffect(() => {
    handleGenerateProblemSpace();
  }, []);

  const handleRunSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRunning(true);
    console.log("Go time!");
    try {
      const data = await solveProblem(gridArray, selectedAlgorithm);
      const { moveHistory, performanceData } = data;
      console.log("Before await display");
      console.log(moveHistory);
      await displayMoveHistory(moveHistory);
      setPerformance(performanceData);
      console.log("After await display");
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    } finally {
      console.log("running set to false");
      setRunning(false);
    }
  };

  return (
    <div className="container mx-auto m-4">
      <Grid arrayData={gridArray} />
      <button
        onClick={handleGenerateProblemSpace}
        className="outline bg-gray-300 rounded-lg p-2 hover:bg-slate-200"
        disabled={running}
      >
        Generate New Problem Space
      </button>
      <div className="flex items-center my-4">
        <form onSubmit={handleRunSubmit}>
          <select
            className="mx-4"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
          >
            {availableAlgorithms.map((val, index) => {
              return (
                <option key={index} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="outline bg-gray-300 rounded-lg p-2 hover:bg-slate-200"
            disabled={running}
          >
            Run Solver
          </button>
        </form>
      </div>
      <h1>Selected: {selectedAlgorithm}</h1>
      {performance && <PerformanceData statistics={performance} />}
    </div>
  );
};

export default GridContainer;
// "use client";
// import { useState, useEffect } from "react";
// import Grid from "@/components/Grid";

// const ROWS = 10;
// const COLS = 10;

// function generateGrid(rows: number, cols: number) {
//   const grid = [];

//   for (let row = 0; row < rows; row++) {
//     const gridRow = [];
//     for (let col = 0; col < cols; col++) {
//       gridRow.push(0);
//     }
//     grid.push(gridRow);
//   }
//   return grid;
// }

// export default function GridContainer() {
//   const [grid, setGrid] = useState<Grid | null>(null);

//   useEffect(() => setGrid(generateGrid(ROWS, COLS)), []);

//   // function highlightBox(row: number, col: number) {
//   //   setGrid((prevGrid) => {
//   //     const newGrid = [...prevGrid]; // Create a new copy of the outer array
//   //     newGrid[row] = [...prevGrid[row]]; // Create a new copy of the inner array
//   //     newGrid[row][col] = 1; // Update the desired element
//   //     return newGrid; // Return the new state
//   //   });
//   // }

//   return (
//     <div className="container mx-auto m-4">
//       <Grid grid={grid} />
//     </div>
//   );
// }
