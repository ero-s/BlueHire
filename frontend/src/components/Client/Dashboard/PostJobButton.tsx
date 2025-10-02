export default function PostJobButton() {
  return (
    <button
      style={{
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "16px",
        padding: "2rem",
        fontSize: "18px",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
      }}
      onClick={() => console.log("Post New Job clicked")}
    >
      <span style={{ fontSize: "24px" }}>+</span>
      Post New Job!
    </button>
  );
}
