import { GridSquare } from "@/types/types";
import Grid from "../grid";
import OptimizationContext from "./optimizationcontext";

export interface PerformanceProfile {
  elapsedTime: number;
  numberOfSteps: number;
  absoluteMax: number;
  absoluteMin: number;
  endpoint: number;
  distanceFromTop: number;
}

export class PerformanceProfiler {
  public elapsedTime: number | undefined;
  public agentStartPosition: { col: number; row: number } | undefined;
  public agentEndPosition: { col: number; row: number } | undefined;
  public moveHistory: GridSquare[][][] | undefined;

  private logAgentStartPosition(agentPostition: { col: number; row: number }) {
    this.agentStartPosition = agentPostition;
  }

  private logAgentEndPosition(agentPostition: { col: number; row: number }) {
    this.agentEndPosition = agentPostition;
  }

  /**
   * Profiles the algorithm while it runs collecting time data
   * and start/end positions for the agent.
   *
   * @param grid the Grid to profile
   * @param callbackfn the algorithm you want to run must
   * implement optimizationstrategy
   * @returns move history from the algorithm
   */
  runProfiler(
    grid: Grid,
    callbackfn: (problemSpace: Grid) => GridSquare[][][]
  ): GridSquare[][][] {
    const agentStartPosition = grid.getAgentPosition();
    if (agentStartPosition) {
      this.logAgentStartPosition(agentStartPosition);
    }

    const startTime = performance.now();

    const moveHistory = callbackfn(grid);

    const endTime = performance.now();
    this.elapsedTime = endTime - startTime;

    const agentEndPosition = grid.getAgentPosition();
    if (agentEndPosition) {
      this.logAgentEndPosition(agentEndPosition);
    }

    this.moveHistory = moveHistory;
    return moveHistory;
  }

  private getAbsolutes(grid: GridSquare[][]): {
    absoluteMin: number;
    absoluteMax: number;
  } {
    let absMax;
    let absMin;

    findMax: for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 1) {
          absMax = grid.length - row;
          break findMax;
        }
      }
    }

    findMin: for (let row = grid.length - 1; row >= 0; row--) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === 1) {
          absMin = grid.length - row;
          break findMin;
        }
      }
    }

    if (!(absMax && absMin)) {
      throw Error("Invalid problem space. Must have terrain");
    }

    return { absoluteMin: absMin, absoluteMax: absMax };
  }

  getProfile(): PerformanceProfile | null {
    const performanceData: PerformanceProfile = {
      elapsedTime: 0,
      numberOfSteps: 0,
      absoluteMax: 0,
      absoluteMin: 0,
      endpoint: 0,
      distanceFromTop: 0,
    };

    if (
      !(
        this.elapsedTime &&
        this.moveHistory &&
        this.agentEndPosition &&
        this.agentStartPosition
      )
    ) {
      return null;
    }

    performanceData["elapsedTime"] = this.elapsedTime;
    performanceData["numberOfSteps"] = this.moveHistory.length - 1;

    const { absoluteMax, absoluteMin } = this.getAbsolutes(this.moveHistory[0]);
    performanceData["absoluteMax"] = absoluteMax;
    performanceData["absoluteMin"] = absoluteMin;

    performanceData["endpoint"] =
      this.moveHistory[0].length - this.agentEndPosition["row"] - 1;

    performanceData["distanceFromTop"] =
      absoluteMax - performanceData["endpoint"];

    return performanceData;
  }
}
