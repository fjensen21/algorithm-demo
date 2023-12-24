import { NextRequest, NextResponse } from "next/server";
import OptimizationContext from "@/lib/optimization/optimizationcontext";
import HillClimbing from "@/lib/optimization/algorithms/hillclimbing";
import Grid from "@/lib/grid";

export async function POST(request: NextRequest) {
  const { grid, algorithm } = await request.json();

  if (!grid || !algorithm) {
    const responseInfo = {
      error: "Bad Request",
      message: "The request body is missing data or empty",
    };
    return Response.error;
  }

  // Validate grid is valid

  // Validate algorithm is valid

  // Generate start point

  const gridClass = new Grid(grid);
  gridClass.setAgentStartPosition(0);

  const selectedAlgorithm = new HillClimbing();
  const moveHistory = new OptimizationContext(
    selectedAlgorithm
  ).executeOptimizer(gridClass);

  const dummyPerformance = {
    elapsedTime: 15.03,
    absoluteMax: 5,
    absoluteMin: 0,
    endpoint: 4,
  };

  const dummyResponse = {
    moveHistory: moveHistory,
    performanceData: dummyPerformance,
  };

  return NextResponse.json(dummyResponse);
}
