import React, { memo, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import { Link, withRouter } from "react-router-dom";
import CustomToggle from "./CustomToggle/CustomToggle";
import "./Sidebar.scss";

interface Props {
  history: any;
}

const list = [
  {
    primaryText: "Home",
    icon: "home",
    to: "/",
  },
  {
    primaryText: "Interactions",
    icon: "people",
    to: "/interactions",
  },
  {
    primaryText: "Yes/No",
    icon: "check",
    to: "/yesno",
  },
  {
    primaryText: "Alert",
    icon: "warning",
  },
  {
    to: "/configure",
  },
];

const NavContentEx: React.FC<Props> = ({ history }) => {
  const [selected, setSelected] = useState<any>(
    list.findIndex((x) => x.to === window.location.pathname)
  );

  history.listen(() => {
    setSelected(list.findIndex((x) => x.to === window.location.pathname));
  });

  const handleClick = (i: number) => {
    if (i !== 3) setSelected(i);
    else {
      let audio = new Audio("/alert.mp3");
      audio.play();
    }
  };

  return (
    <div className="nav-content">
      <List>
        {list.map(({ primaryText, icon, to }, i) =>
          i <= 3 ? (
            <ListItem
              component={to ? Link : "div"}
              {...(!!to && { to })}
              selected={i === selected}
              onClick={() => handleClick(i)}
              key={primaryText}
              button
            >
              <ListItemIcon>
                <Icon>{icon}</Icon>
              </ListItemIcon>
              <ListItemText
                primary={primaryText}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
          ) : null
        )}
        <Divider style={{ margin: "12px 0 0" }} />
        <ListItem
          component={"/configure" ? Link : "div"}
          to="/configure"
          selected={4 === selected}
          onClick={() => handleClick(4)}
          button
        >
          <ListItemIcon>
            <Icon>settings</Icon>
          </ListItemIcon>
          <ListItemText
            primary={"Configure Voice"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
        <Divider style={{ margin: "0px 0 12px" }} />

        <ListItem>
          <ListItemText
            primary={"Virtual Keyboard"}
            primaryTypographyProps={{ noWrap: true }}
          />
          <CustomToggle />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"Dark Mode"}
            primaryTypographyProps={{ noWrap: true }}
          />
          <CustomToggle dark={true} />
        </ListItem>
      </List>
    </div>
  );
};

export default memo(withRouter(NavContentEx));
