interface BarChartProps {
  data: number[];
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        height: "200px",
      }}
    >
      {data.map((height, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: "#60a5fa",
            borderRadius: "4px 4px 0 0",
            height: `${height}%`,
          }}
        />
      ))}
    </div>
  );
}
