export default function Footer() {
  return (
    <footer
      style={{
        background: "white",
        padding: "3rem",
        borderTop: "1px solid #e5e7eb",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "3rem",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            BlueHire
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Connecting workers and clients through amazing experiences.
          </p>
        </div>
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Platform
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Browse Events
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Create Post
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Categories
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Support
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Help Center
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Guidelines
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Connect
          </h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#" style={{ color: "#6b7280" }}>
              🐦
            </a>
            <a href="#" style={{ color: "#6b7280" }}>
              📘
            </a>
            <a href="#" style={{ color: "#6b7280" }}>
              📷
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          © 2025 BlueHire. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
