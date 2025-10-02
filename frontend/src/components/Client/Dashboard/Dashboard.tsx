import PillNav from "./PillNav";
import logo from "../../../assets/logo.jpg";

export default function Dashboard() {
  return (
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
      baseColor="#000000"
      pillColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      pillTextColor="#000000"
    />
  );
}
