import React from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";

interface UserMenuProps {
  profileImg: string;
}

export default function UserMenu({ profileImg }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseItem = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  return (
    <div
      onMouseDown={handleClick}
      id="basic-button-wrapper"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
    >
      <Avatar
        component="div"
        alt="userProfile"
        src={profileImg}
        className={"avatar"}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button-wrapper",
          },
        }}
      >
        <MenuItem onClick={handleCloseItem}>Profile</MenuItem>
        <MenuItem onClick={handleCloseItem}>My account</MenuItem>
        <MenuItem onClick={handleCloseItem}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
