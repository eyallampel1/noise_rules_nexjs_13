import React from "react";
import { Drawer, List, ListItem, Button } from "@mui/material";

const DrawerComponent = ({
  drawerOpen,
  toggleDrawer,
  handleClick,
  handleClick2,
  handleSaveRulesToPC,
  handleLoadCustomRules,
}) => {
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        <ListItem>
          <Button variant="contained" onClick={handleClick}>
            Add / Remove Rule
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" onClick={handleClick2}>
            Modify Rule
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" onClick={handleSaveRulesToPC}>
            Save Rules to PC
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" onClick={handleLoadCustomRules}>
            Load Custom Rules
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerComponent;