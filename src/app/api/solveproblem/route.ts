import { NextRequest, NextResponse } from "next/server";

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

  const dummyHistory = [
    [
      [0, 0, 0],
      [2, 1, 0],
      [1, 0, 1],
    ],
    [
      [0, 2, 0],
      [0, 1, 0],
      [1, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 2],
      [1, 0, 1],
    ],
  ];

  const dummyPerformance = {
    elapsedTime: 15.03,
    absoluteMax: 5,
    absoluteMin: 0,
    endpoint: 4,
  };

  const dummyResponse = {
    moveHistory: dummyHistory,
    performanceData: dummyPerformance,
  };

  return NextResponse.json(dummyResponse);
}
