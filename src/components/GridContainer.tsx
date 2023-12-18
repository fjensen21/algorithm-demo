"use client";
import { useState, useEffect } from "react";
import Grid, { BoxTypes } from "@/components/Grid";

async function getNewProblemSpace() {
  try {
    const res = await fetch("/api/generateproblemspace");
    const data = await res.json();

    return data.grid;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}

const GridContainer: React.FC = () => {
  const [gridArray, setGridArray] = useState<BoxTypes[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

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

  return (
    <div className="container mx-auto m-4">
      <Grid arrayData={gridArray} />
      <button
        onClick={handleGenerateProblemSpace}
        className="outline bg-gray-300 rounded-lg p-2 hover:bg-slate-200"
      >
        Generate Random Problem Space
      </button>
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
