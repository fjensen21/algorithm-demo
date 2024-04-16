import Grid from "@/lib/grid";
import { OptimizationStrategy } from "../optimizationstrategy";
import { GridSquare } from "@/types/types";

export default class SimulatedAnnealing implements OptimizationStrategy {
  /**
   * Schedule controls the temperature over time. get the temperature for
   * any given time
   *
   * @param time
   * @returns temperature for a given time
   */
  private schedule(time: number): number {
    const initialTemperature = 10;
    const coolingRate = 0.55;
    return initialTemperature * coolingRate ** time;
  }

  private getRandomNeighbor(problemSpace: Grid): {
    move: "right" | "left";
    score: number;
  } {
    if (
      problemSpace.getAgentPosition()?.col === problemSpace.getBoundary("left")
    ) {
      const score = problemSpace.evaluteState(
        problemSpace.getNeighborAgentPosition("right")
      );
      return { move: "right", score: score };
    } else if (
      problemSpace.getAgentPosition()?.col === problemSpace.getBoundary("right")
    ) {
      const score = problemSpace.evaluteState(
        problemSpace.getNeighborAgentPosition("left")
      );
      return { move: "left", score: score };
    }

    const randomNum = Math.random();
    const direction = randomNum < 0.5 ? "right" : "left";
    const score = problemSpace.evaluteState(
      problemSpace.getNeighborAgentPosition(direction)
    );

    return { move: direction, score: score };
  }

  optimize(problemSpace: Grid): GridSquare[][][] {
    const moveHistory: GridSquare[][][] = [];
    problemSpace.setAgentStartPosition(
      Math.floor(Math.random() * problemSpace.getBoundary("right"))
    );

    let time = 0;
    while (time < 100000) {
      time++;
      moveHistory.push(problemSpace.getGrid());

      const temperature = this.schedule(time);
      if (temperature <= 0) return moveHistory;

      const nextNeighbor = this.getRandomNeighbor(problemSpace);

      const change =
        nextNeighbor.score -
        problemSpace.evaluteState(problemSpace.getAgentPosition());
      if (change < 0) {
        problemSpace.move(nextNeighbor.move);
      } else {
        const changeConstant = 100;
        const probabilityOfSelecting = Math.pow(
          Math.E,
          (change * changeConstant) / temperature
        );
        const randomNum = Math.random();

        if (randomNum <= probabilityOfSelecting) {
          problemSpace.move(nextNeighbor.move);
        }
      }
    }
  }
}
