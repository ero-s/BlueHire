import PillNav from "./DashboardPillNav.tsx";
import "../assets/css/DashboardHeader.css";
import { LuBell, LuMail } from "react-icons/lu";
import UserMenu from "./DashboardUserMenu.tsx";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  logo: string;
  userName: string;
}

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Workers", href: "/findworkers" },
  { label: "Bookings", href: "/bookings" },
  { label: "Transactions", href: "/transactions" },
  { label: "Hire History", href: "/pastHire" },
];

export default function DashboardHeader({ logo }: HeaderProps) {
  const navigate = useNavigate();
  const profileImg = "https://i.pravatar.cc/150?u=99";

  const handleBellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Bell clicked!");
  };

  const handleMailClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/messages");
  };

  return (
    <div className={"header-format"}>
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={navItems}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor=" rgba(59, 130, 246)"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      <div className={"right-side-header"}>
        {/*<SearchBar />*/}

        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-[#3b82f6] hover:border-[#3b82f6] hover:shadow-md transition-all duration-200 shadow-sm relative group"
          type="button"
          onClick={handleMailClick}
        >
          <LuMail size={22} className={"icon"} />
        </button>

        <button
          className={"btn-header"}
          type={"button"}
          onClick={handleBellClick}
        >
          <LuBell size={22} className={"icon"} />
        </button>

        <UserMenu className={"btn-header-profile"} profileImg={profileImg} />
      </div>
    </div>
  );
}
