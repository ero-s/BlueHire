// import React from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  onClick?: () => void; // Added optional onClick handler
}

export default function DashboardStatCard({ label, value, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        cursor: onClick ? "pointer" : "default", // Change cursor if clickable
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      // specific hover effects usually require CSS classes or styled-components, 
      // but this mouse enter/leave logic works for inline styles if needed, 
      // or you can rely on the CSS file you imported in the parent.
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        }
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