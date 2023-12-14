import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const problemSpace = [
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
  ];
  let json_response = {
    status: "success",
    grid: problemSpace,
  }
  return NextResponse.json(json_response)
}