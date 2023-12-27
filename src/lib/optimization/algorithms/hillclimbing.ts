import Grid from "@/lib/grid";
import { OptimizationStrategy } from "../optimizationstrategy";
import AlgorithmRegistry from "./algorithmregistry";
import { GridSquare } from "@/types/types";

export default class HillClimbing implements OptimizationStrategy {
  optimize(problemSpace: Grid): GridSquare[][][] {
    const moveHistory: GridSquare[][][] = [];

    const agentPosition = problemSpace.getAgentPosition();

    if (agentPosition === null) {
      throw Error(
        "Agent must be initialized before runnning optimize function"
      );
    }

    let startCol = agentPosition.col;
    const endCol = problemSpace.getBoundary("right");

    moveHistory.push(problemSpace.getGrid());

    for (let i = startCol; i < endCol; i++) {
      problemSpace.move("right");
      let gridCopy = problemSpace.getGrid();
      moveHistory.push(gridCopy);
    }

    return moveHistory;
  }
}

AlgorithmRegistry.registerAlgorithm("hill-climbing", HillClimbing);
