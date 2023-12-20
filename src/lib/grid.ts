type Action = "down" | "flat" | "up";

class Grid {
  public readonly rows = 10;
  public readonly cols = 10;
  public grid: number[][];

  constructor() {
    let grid = [];
    for (let row = 0; row < this.rows; row++) {
      let gridRow = [];
      for (let col = 0; col < this.cols; col++) {
        gridRow.push(0);
      }
      grid.push(gridRow);
    }
    this.grid = grid;
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

  getEmptyGrid(): number[][] {
    let grid = [];
    for (let row = 0; row < this.rows; row++) {
      let gridRow = [];
      for (let col = 0; col < this.cols; col++) {
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
    let newGrid = this.getEmptyGrid();
    let currentCol = 0;
    let currentRow = Math.floor(Math.random() * (newGrid.length - 2)) + 1;

    let probabilities = [0.33, 0.33, 0.33];
    let lastAction: Action = "flat";

    while (currentCol < newGrid[0].length) {
      console.log(`Col: ${currentCol}, Row: ${currentRow}`);
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
