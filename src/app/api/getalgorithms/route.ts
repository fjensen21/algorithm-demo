import { NextRequest, NextResponse } from "next/server";
import {
  algorithmInfo,
  algorithms,
} from "@/lib/optimization/algorithms/algorithmregistry";

export async function GET(request: NextRequest) {
  // const algorithmNames = Object.keys(algorithms);
  // const responseObject = {
  //   algorithms: algorithmNames,
  // };
  const responseObject = {
    algorithms: algorithmInfo,
  };
  return NextResponse.json(responseObject);
}
