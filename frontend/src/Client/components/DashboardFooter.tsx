import "../assets/css/DashboardFooter.css"
export default function DashboardFooter() {
  return (
    <footer className="footer-container"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "3rem",
        }}
      >
        <div>
          <h3 className={"footer-header"}
          >
            BlueHire
          </h3>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Connecting workers and clients through amazing experiences.
          </p>
        </div>
        <div>
          <h3 className={"footer-header"}
          >
            Platform
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                className={"footer-ref"}
              >
                Browse Events
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                className={"footer-ref"}
              >
                Create Post
              </a>
            </li>
            <li>
              <a
                href="#"
                className={"footer-ref"}
              >
                Categories
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={"footer-header"}
          >
            Support
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                className={"footer-ref"}
              >
                Help Center
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <a
                href="#"
                className={"footer-ref"}
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className={"footer-ref"}
              >
                Guidelines
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={"footer-header"}
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
