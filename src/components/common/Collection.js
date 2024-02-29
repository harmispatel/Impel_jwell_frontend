import React from "react";
import { Link } from "react-router-dom";
import { Drawer, ButtonToolbar, Button, IconButton, Placeholder } from "rsuite";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleDownIcon from "@rsuite/icons/legacy/AngleDown";
import AngleUpIcon from "@rsuite/icons/legacy/AngleUp";
import "rsuite/dist/rsuite.min.css";

const Collection = () => {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };

  return (
    <>
      <button className="womans-toggle" onClick={() => handleOpen("left")}>
        Join our womens club
      </button>

      <Drawer placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Placeholder.Paragraph rows={8} />
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default Collection;
