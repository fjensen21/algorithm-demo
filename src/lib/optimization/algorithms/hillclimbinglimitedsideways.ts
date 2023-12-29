import Grid from "@/lib/grid";
import { OptimizationStrategy } from "../optimizationstrategy";
import { GridSquare } from "@/types/types";

export default class HillClimbingLimitedSideways
  implements OptimizationStrategy
{
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

    let sidewaysMoves = 15;

    while (
      bestNeighbor.score >=
        problemSpace.evaluteState(problemSpace.getAgentPosition()) &&
      sidewaysMoves > 0
    ) {
      if (
        bestNeighbor.score ===
        problemSpace.evaluteState(problemSpace.getAgentPosition())
      ) {
        sidewaysMoves--;
      }
      problemSpace.move(bestNeighbor.move);
      moveHistory.push(problemSpace.getGrid());
      bestNeighbor = problemSpace.getBestNeighbor();
    }

    return moveHistory;
  }
}
