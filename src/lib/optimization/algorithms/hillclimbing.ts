import Grid from "@/lib/grid";
import { OptimizationStrategy } from "../optimizationstrategy";
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

    let bestNeighbor = problemSpace.getBestNeighbor();
    moveHistory.push(problemSpace.getGrid());

    while (
      bestNeighbor.score >
      problemSpace.evaluteState(problemSpace.getAgentPosition())
    ) {
      problemSpace.move(bestNeighbor.move);
      moveHistory.push(problemSpace.getGrid());
      bestNeighbor = problemSpace.getBestNeighbor();
    }

    return moveHistory;
  }
}
