import Grid from "@/lib/grid";
import { OptimizationStrategy } from "../optimizationstrategy";
import { GridSquare } from "@/types/types";

export default class HillClimbingRandomRestarts
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

    const { absoluteMax } = problemSpace.getAbsolutes();
    const topAgentPosition = absoluteMax + 1;

    while (
      problemSpace.evaluteState(problemSpace.getAgentPosition()) !=
      topAgentPosition
    ) {
      let bestNeighbor = problemSpace.getBestNeighbor();
      moveHistory.push(problemSpace.getGrid());

      let sidewaysMoves = 50;

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

      if (
        problemSpace.evaluteState(problemSpace.getAgentPosition()) ==
        topAgentPosition
      ) {
        return moveHistory;
      } else {
        problemSpace.setAgentStartPosition(
          Math.floor(Math.random() * problemSpace.getBoundary("right"))
        );
      }
    }

    moveHistory.push(problemSpace.getGrid());
    return moveHistory;
  }
}
