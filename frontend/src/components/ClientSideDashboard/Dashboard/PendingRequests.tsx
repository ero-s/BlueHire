interface PendingRequestsProps {
  count: number;
}

export default function PendingRequests({ count }: PendingRequestsProps) {
  return (
    <div
      style={{
        flex: "1",
        background: "white",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "1.5rem" }}>
        Pending Requests
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            style={{
              height: "48px",
              background: "#e5e7eb",
              borderRadius: "24px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
