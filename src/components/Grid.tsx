import React from "react";

export type BoxTypes = 0 | 1 | 2;

interface GridProps {
  arrayData: BoxTypes[][];
}
interface BoxProps {
  boxType: BoxTypes;
}

const Box: React.FC<BoxProps> = ({ boxType }) => {
  if (boxType == 0) {
    return <div className="border inline-block p-2 w-2 h-2"></div>;
  } else if (boxType == 1) {
    return <div className="border inline-block p-2 w-2 h-2 bg-green-600"></div>;
  }
  return <div className="border inline-block p-2 w-2 h-2 bg-red-600"></div>;
};

const Grid: React.FC<GridProps> = ({ arrayData }) => {
  return (
    <div>
      {arrayData.map((row: BoxTypes[], rowIndex: number) => (
        <div key={rowIndex} className="block">
          {row.map((item: BoxTypes, colIndex: number) => (
            <Box key={colIndex} boxType={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

// import { Grid } from "./GridContainer";

// interface BoxProps {
//   selected: number;
// }

// interface GridProps {
//   grid: Grid | null;
// }

// const Box: React.FC<BoxProps> = ({ selected }) => {
//   if (selected) {
//     return <div className="w-4 h-4 bg-black" />;
//   }
//   return <div className="w-4 h-4 bg-white" />;
// };

// const Grid: React.FC<GridProps> = ({ grid }) => {
//   // Grid [[],[],[]]

//   const generateBoxes = (grid: Grid) => {
//     const boxes = [];
//     for (let row = 0; row < grid.length; row++) {
//       for (let col = 0; col < grid[row].length; col++) {
//         boxes.push(<Box selected={grid[row][col]} key={`${row}-${col}`} />);
//       }
//     }
//     return boxes;
//   };

//   if (grid) {
//     return (
//       <div className="grid grid-cols-10 gap-1 outline bg-gray-300">
//         {generateBoxes(grid)}
//       </div>
//     );
//   } else {
//     return <h1>Loading Grid...</h1>;
//   }
// };

// export default Grid;
