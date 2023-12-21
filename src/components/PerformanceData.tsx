interface PerformanceDataProps {
  statistics: {
    elapsedTime: number;
    absoluteMax: number;
    absoluteMin: number;
    endpoint: number;
  };
}

export default function PerformanceData({
  statistics,
}: PerformanceDataProps) {

  const percentFromTop = (statistics.endpoint / statistics.absoluteMax) * 100;
  const scoreColor = "green";
  return (
    <div className="mt-4">
      <h1 className="text-xl">Performance Data: </h1>
      <h2>
        Elapsed Time: <span>{statistics.elapsedTime}</span>
      </h2>
      <h2>
        Absolute Max: <span>{statistics.absoluteMax}</span>
      </h2>
      <h2>
        Absolute Min: <span>{statistics.absoluteMin}</span>
      </h2>
      <h2>
        End Point: <span>{statistics.endpoint}</span>
      </h2>
      <h2>
        Distance from top: <span>{percentFromTop}%</span>
      </h2>
    </div>
  );
}
