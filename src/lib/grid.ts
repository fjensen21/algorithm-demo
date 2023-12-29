import { GridSquare } from "../types/types";
type Action = "down" | "flat" | "up";
type Direction = "right" | "left";

class Grid {
  public static readonly defaultRows = 30;
  public static readonly defaultCols = 80;
  private grid: GridSquare[][];
  private agentPosition: { row: number | null; col: number | null } = {
    row: null,
    col: null,
  };

  constructor(inputGrid: GridSquare[][]) {
    // Clear any existing agents
    for (let row = 0; row < inputGrid.length; row++) {
      for (let col = 0; col < inputGrid[0].length; col++) {
        if (inputGrid[row][col] === 2) {
          inputGrid[row][col] = 0;
        }
      }
    }

    this.grid = inputGrid;
  }

  getGrid(): GridSquare[][] {
    return this.grid.map((row) => row.slice());
  }

  /**
   * Get the current coordinates for the agent
   *
   * @returns null if the agent hasn't been initialized and an object with row and col of the agent if it has
   */
  getAgentPosition(): { row: number; col: number } | null {
    if (this.agentPosition.row === null || this.agentPosition.col === null) {
      return null;
    }
    return {
      row: this.agentPosition.row,
      col: this.agentPosition.col,
    };
  }

  /**
   * Given a start col in range. Set the start position for the agent.
   *
   * @param col a start column (in grid range) for the agent
   * @returns True if the position is set, false if a start position
   * has already been initialized or the given column is outside
   * of the grid range.
   */
  setAgentStartPosition(col: number): boolean {
    if (this.getAgentPosition() !== null) {
      return false;
    }
    if (col < 0 || col >= this.grid[0].length) {
      return false;
    }
    for (let row = 0; row < this.grid.length; row++) {
      if (this.grid[row][col] == 1) {
        this.grid[row - 1][col] = 2;
        this.updateAgentPosition(row - 1, col);
        return true;
      }
    }
    throw Error(
      "Internal Class Error: No terrain block was found in the given column"
    );
  }

  private updateAgentPosition(row: number, col: number) {
    if (this.agentPosition.row === null || this.agentPosition.col === null) {
      this.grid[row][col] = 2;
      this.agentPosition.row = row;
      this.agentPosition.col = col;
      return;
    }

    const agentRow = this.agentPosition.row;
    const agentCol = this.agentPosition.col;

    this.grid[agentRow][agentCol] = 0;

    this.grid[row][col] = 2;
    this.agentPosition.row = row;
    this.agentPosition.col = col;
  }

  /**
   * Get the furthest valid row/col in any direction for the grid
   *
   * @param boundary the grid edge you want a position for
   * @returns the furthest valid position for the specified boundary
   */
  getBoundary(boundary: "left" | "right" | "top" | "bottom"): number {
    if (boundary === "left") {
      return 0;
    } else if (boundary === "right") {
      return this.grid[0].length - 1;
    } else if (boundary === "top") {
      return 0;
    } else if (boundary === "bottom") {
      return this.grid.length - 1;
    } else {
      throw Error("Parameter must be a valid boundary string");
    }
  }

  /**
   * Return the coordinates for an agent if they were to move
   * left or right
   *
   * @param direction the direction you want to check coordinates for
   * @returns the coordinates for the given direction
   */
  getNeighborAgentPosition(direction: "right" | "left"): {
    col: number;
    row: number;
  } | null {
    let neighborCol = -1;
    let neighborRow = -1;

    // Check that we aren't at left or right boundary
    if (
      direction === "left" &&
      this.getBoundary("left") === this.getAgentPosition()?.col
    ) {
      return null;
    } else if (
      direction === "right" &&
      this.getBoundary("right") === this.getAgentPosition()?.col
    ) {
      return null;
    }

    let rowOffset = -2;
    let endRowOffset = 0;

    if (this.getAgentPosition()!.row === this.getBoundary("top")) {
      endRowOffset--;
    }

    if (this.getAgentPosition()!.row === this.getBoundary("bottom")) {
      rowOffset++;
    }

    let terrainCol =
      direction === "right"
        ? this.getAgentPosition()!.col + 1
        : this.getAgentPosition()!.col - 1;

    for (rowOffset; rowOffset <= endRowOffset; rowOffset++) {
      const terrainRowToCheck = this.getAgentPosition()!.row - rowOffset;

      if (this.grid[terrainRowToCheck][terrainCol] === 1) {
        return { row: terrainRowToCheck - 1, col: terrainCol };
      }
    }
    throw Error("Something unexpected happened agent position was not updated");
  }

  /**
   * Evaluate an agent's position and return a score
   *
   * @param agentPosition an agents coordinates on the problem space
   * @returns the agents score
   */
  evaluteState(agentPosition: { col: number; row: number }): number {
    let score = -1;

    return score;
  }

  /**
   * Move the agent one square to the left or right
   *
   * @param direction the direction you want to move the agent
   */
  move(direction: Direction) {
    if (this.getAgentPosition() === null) {
      throw Error("No agent has been initialized.");
    }

    // Check that we aren't at left or right boundary
    if (
      direction === "left" &&
      this.getBoundary("left") === this.getAgentPosition()?.col
    ) {
      throw Error("Cannot move further to the left at boundary");
    } else if (
      direction === "right" &&
      this.getBoundary("right") === this.getAgentPosition()?.col
    ) {
      throw Error("Cannot move further to the right at boundary");
    }

    let rowOffset = -2;
    let endRowOffset = 0;

    if (this.getAgentPosition()!.row === this.getBoundary("top")) {
      endRowOffset--;
    }

    if (this.getAgentPosition()!.row === this.getBoundary("bottom")) {
      rowOffset++;
    }

    let terrainCol =
      direction === "right"
        ? this.getAgentPosition()!.col + 1
        : this.getAgentPosition()!.col - 1;

    for (rowOffset; rowOffset <= endRowOffset; rowOffset++) {
      const terrainRowToCheck = this.getAgentPosition()!.row - rowOffset;

      if (this.grid[terrainRowToCheck][terrainCol] === 1) {
        this.updateAgentPosition(terrainRowToCheck - 1, terrainCol);
        return;
      }
    }
    throw Error("Something unexpected happened agent position was not updated");
  }

  maskProbabilities(preferredAction: Action, probabilities: number[]) {
    const preferredBias = 0.1;
    let mask: number[];
    if (preferredAction == "down") {
      mask = [preferredBias, preferredBias / 2, 0];
      probabilities = probabilities.map((value, index) => value + mask[index]);
    } else if (preferredAction == "up") {
      mask = [0, preferredBias / 2, preferredBias];
      probabilities = probabilities.map((value, index) => value + mask[index]);
    } else {
      mask = [preferredBias, 0, preferredBias];
      probabilities = probabilities.map((value, index) => value + mask[index]);
    }
    return probabilities;
  }

  /**
   * Normalizes probabilities to be between 0 and 1 when given a list of probabilities
   *
   * @param probabilities
   * @returns
   */
  normalizeProbabilities(probabilities: number[]): number[] {
    const sum = probabilities.reduce((acc, val) => acc + val, 0);
    return probabilities.map((prob) => prob / sum);
  }

  /**
   * Pick a random action given the probabilities of each action
   *
   * @param {number[]} probabilities
   * @returns {Action} The chosen action
   */
  getRandomAction(probabilities: number[]): Action {
    let actions: Action[] = ["down", "flat", "up"];
    if (actions.length != probabilities.length) {
      throw new Error(
        "Number of probabilities must match number of available actions"
      );
    }

    const normalizedProbabilities = this.normalizeProbabilities(probabilities);

    const randomValue = Math.random();

    let cumulativeProbability = 0;

    for (let i = 0; i < normalizedProbabilities.length; i++) {
      if (normalizedProbabilities[i] == 0) continue;
      cumulativeProbability += normalizedProbabilities[i];
      if (randomValue <= cumulativeProbability) {
        return actions[i];
      }
    }

    return "flat";
  }

  getNextRow(action: Action, currentRow: number): number {
    if (action === "down") {
      return currentRow + 1;
    } else if (action === "flat") {
      return currentRow;
    } else {
      return currentRow - 1;
    }
  }

  static getEmptyGrid(
    defaultRows: number,
    defaultCols: number
  ): GridSquare[][] {
    let grid: GridSquare[][] = [];
    for (let row = 0; row < defaultRows; row++) {
      let gridRow: GridSquare[] = [];
      for (let col = 0; col < defaultCols; col++) {
        gridRow.push(0);
      }
      grid.push(gridRow);
    }
    return grid;
  }

  generateProblemSpace() {
    /* 
    Pick a random value for the leftmost column between 0 and rows - 1
    for each column in the grid
      select an action (up, down, flat)
      update probabilities based on last action and position
    */
    let newGrid = Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols);
    let currentCol = 0;
    let currentRow = Math.floor(Math.random() * (newGrid.length - 2)) + 1;

    let probabilities = [0.33, 0.33, 0.33];
    let lastAction: Action = "flat";

    while (currentCol < newGrid[0].length) {
      newGrid[currentRow][currentCol] = 1;
      currentCol++;

      // Select next action and update row

      if (currentRow <= 1) {
        probabilities[2] = 0;
        probabilities = this.maskProbabilities("down", probabilities);
      } else if (currentRow >= newGrid.length - 2) {
        probabilities[0] = 0;
        probabilities = this.maskProbabilities("up", probabilities);
      } else {
        probabilities = this.maskProbabilities(lastAction, probabilities);
      }

      let nextAction = this.getRandomAction(probabilities);
      currentRow = this.getNextRow(nextAction, currentRow);

      // Update last action
      lastAction = nextAction;
    }
    this.grid = newGrid;
  }
}

export default Grid;
