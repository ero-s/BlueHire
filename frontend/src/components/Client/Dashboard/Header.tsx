import PillNav from "./PillNav";
import SearchBar from "./SearchBar";

interface HeaderProps {
  logo: string;
  userName: string;
}

export default function Header({ logo, userName }: HeaderProps) {
  return (
    <div
      style={{
        padding: "1em 3rem 0 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Bookings", href: "/bookings" },
          { label: "Settings", href: "/settings" },
          { label: "Transactions", href: "/transactions" },
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor=" rgba(59, 130, 246)"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <SearchBar />
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <span style={{ fontSize: "20px" }}>✉</span>
        </button>
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <span style={{ fontSize: "20px" }}>🔔</span>
        </button>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "50px",
            background: "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={logo}
            alt="Profile"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            {userName}
          </span>
        </button>
      </div>
    </div>
  );
}
