import PillNav from "./PillNav";
import "./Header.css";
import { LuBell, LuMail } from "react-icons/lu";
import profileImg from "../../../assets/profile.png";
import React from "react";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar.tsx";

interface HeaderProps {
  logo: string;
  userName: string;
}

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Bookings", href: "/jobposts" },
  { label: "Transactions", href: "/transactions" },
];

export default function Header({ logo, userName }: HeaderProps) {
  const handleBellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Bell clicked!");
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
        <SearchBar />

        <button className={"btn-header"} type="button">
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
