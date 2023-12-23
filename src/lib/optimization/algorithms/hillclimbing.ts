import { OptimizationStrategy } from "../optimizationstrategy";
import AlgorithmRegistry from "./algorithmregistry";
import { GridSquare } from "@/types/types";

export default class HillClimbing implements OptimizationStrategy {
  optimize(problemSpace: GridSquare[][]): GridSquare[][][] {
    const moveHistory: GridSquare[][][] = [];

    for (let row = 0; row < problemSpace.length; row++) {
      let newGrid = problemSpace.map((row) => row.slice());
      newGrid[row][0] = 2;
      moveHistory.push(newGrid);
    }
    return moveHistory;
  }
}

AlgorithmRegistry.registerAlgorithm("hill-climbing", HillClimbing);
