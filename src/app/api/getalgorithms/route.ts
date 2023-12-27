import { NextRequest, NextResponse } from "next/server";
import { algorithms } from "@/lib/optimization/algorithms/algorithmregistry";

export async function GET(request: NextRequest) {
  const algorithmNames = Object.keys(algorithms);
  const responseObject = {
    algorithms: algorithmNames,
  };
  return NextResponse.json(responseObject);
}
