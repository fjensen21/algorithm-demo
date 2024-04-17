export const revalidate = 0;
import { NextRequest, NextResponse } from "next/server";
import OptimizationContext from "@/lib/optimization/optimizationcontext";
import HillClimbing from "@/lib/optimization/algorithms/hillclimbing";
import Grid from "@/lib/grid";
import { algorithms } from "@/lib/optimization/algorithms/algorithmregistry";
import { GridSquare } from "@/types/types";
import AlgorithmSimulator from "@/lib/optimization/algorithmsimulator";

interface RequestPayload {
  grid: GridSquare[][];
  algorithm: string;
}

export async function POST(request: NextRequest) {
  const { grid, algorithm } = (await request.json()) as RequestPayload;

  if (!grid || !algorithm) {
    const responseInfo = {
      error: "Bad Request",
      message: "The request body is missing data or empty",
    };
    throw Error(responseInfo.message);
  }
  // Generate start point
  // const gridClass = new Grid(grid);
  // gridClass.setAgentStartPosition(0);

  // const selectedAlgorithm = new algorithms[algorithm]();

  // const moveHistory = new OptimizationContext(
  //   selectedAlgorithm
  // ).executeOptimizer(gridClass);

  // const dummyPerformance = {
  //   elapsedTime: 15.03,
  //   absoluteMax: 5,
  //   absoluteMin: 0,
  //   endpoint: 4,
  // };

  const simulator = new AlgorithmSimulator(grid, algorithm);
  const { moveHistory, performance } = simulator.simulate();

  const dummyResponse = {
    moveHistory: moveHistory,
    performanceData: performance,
  };

  return NextResponse.json(dummyResponse);
}
