import { Grid } from "./GridContainer";

interface BoxProps {
    selected: number;
}

interface GridProps {
    grid: Grid | null
}


const Box: React.FC<BoxProps> = ({ selected }) => {
  return <div className={`w-4 h-4 bg-${selected ? "black" : "white"}`} />;
};

const Grid: React.FC<GridProps> = ({ grid }) => {
  // Grid [[],[],[]]

  const generateBoxes = (grid: Grid) => {
    const boxes = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        boxes.push(<Box selected={grid[row][col]} key={`${row}-${col}`} />);
      }
    }
    return boxes;
  };

  if (grid) {
    return <div className="grid grid-cols-50 gap-1">{generateBoxes(grid)}</div>;
  } else {
    return <h1>Loading Grid...</h1>;
  }
};

export default Grid;
