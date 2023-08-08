import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Header = ({ toggleDrawer, searchQuery, setSearchQuery }) => {
  return (
    <AppBar position="static" className={"mb-6"}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Noise Rules DB
        </Typography>
        <div
          style={{
            position: "relative",
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            marginLeft: "16px",
          }}
        >
          <div
            style={{
              padding: "0 16px",
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search for rules..."
            style={{ color: "inherit", paddingLeft: "100px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;