import Grid from "@/lib/grid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const problemSpace = new Grid(
    Grid.getEmptyGrid(Grid.defaultRows, Grid.defaultCols)
  );
  problemSpace.generateProblemSpace();
  let json_response = {
    status: "success",
    grid: problemSpace.getGrid(),
  };
  return NextResponse.json(json_response);
}
