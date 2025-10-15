interface StatCardProps {
  label: string;
  value: number | string;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
        {label}
      </p>
      <p style={{ fontSize: "48px", fontWeight: "700", color: "#1f2937" }}>
        {value}
      </p>
    </div>
  );
}
