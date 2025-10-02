import PillNav from "./PillNav";
import logo from "../../../assets/logo.jpg";
import SplitText from "./SplitText";

export default function Dashboard() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        height: "100vh",
        backgroundColor: "#f3f4f6",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "0 2rem" }}>
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
          baseColor="grey"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
      </div>

      <div
        style={{
          marginTop: "50px",
          padding: "0 2rem",
          fontSize: "48px",
          fontWeight: "700",
          color: "#1f2937",
        }}
      >
        <SplitText
          text="Welcome back, John Doe!"
          className="welcome-text"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          textAlign="left"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
    </div>
  );
}
