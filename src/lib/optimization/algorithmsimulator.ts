import { GridSquare } from "@/types/types";
import { algorithms } from "./algorithms/algorithmregistry";
import Grid from "../grid";
import OptimizationContext from "./optimizationcontext";
import { PerformanceProfile, PerformanceProfiler } from "./performanceprofiler";

// Give it an algorithm to run
// Give it a grid array
// Generates a grid, sets up timer, runs algorithm, stops timer
// Pass moveHistory and time to Performance method, gets performance object
// return performance object and movehistory

export default class AlgorithmSimulator {
  private grid: Grid;
  private optimizationcontext: OptimizationContext;
  private profiler: PerformanceProfiler;

  constructor(gridArray: GridSquare[][], algorithm: string) {
    if (!Object.keys(algorithms).includes(algorithm)) {
      throw Error(
        `Algorithm [${algorithm}] is not valid please provide a valid algorithm`
      );
    }
    const AlgorithmClass = algorithms[algorithm];
    const algorithmInstance = new AlgorithmClass();

    this.optimizationcontext = new OptimizationContext(algorithmInstance);
    this.grid = new Grid(gridArray);
    this.profiler = new PerformanceProfiler();
  }

  generateRandomStartPoint() {
    return Math.floor(Math.random() * this.grid.getBoundary("right"));
  }

  simulate(): {
    moveHistory: GridSquare[][][];
    performance: PerformanceProfile;
  } {
    this.grid.setAgentStartPosition(this.generateRandomStartPoint());

    const moveHistory = this.profiler.runProfiler(this.grid, (grid) =>
      this.optimizationcontext.executeOptimizer(grid)
    );

    const performance = this.profiler.getProfile();
    if (!performance) {
      throw Error("Failure to get performance profile");
    }
    const runResults = {
      moveHistory: moveHistory,
      performance: performance,
    };
    return runResults;
  }
}
