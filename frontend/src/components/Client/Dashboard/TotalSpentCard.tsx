import BarChart from "./BarChart";
interface TotalSpentCardProps {
  total: number | string;
  chartData: number[];
}

export default function TotalSpentCard({
  total,
  chartData,
}: TotalSpentCardProps) {
  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        flex: 1,
      }}
    >
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
        Total Spent
      </p>
      <p
        style={{
          fontSize: "48px",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "2rem",
        }}
      >
        {total}
      </p>
      <BarChart data={chartData} />
    </div>
  );
}
