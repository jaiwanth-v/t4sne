import React, { useContext, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Context/App.context";
import Speech from "speak-tts";

const list = [
  {
    primaryText: "Home",
    icon: "home",
    to: "/",
  },
  {
    primaryText: "Yes/No",
    icon: "check",
    to: "/yesno",
  },
  {
    primaryText: "Interactions",
    icon: "people",
    to: "/interactions",
  },
  {
    primaryText: "Alert",
    icon: "warning",
  },
  {
    to: "/configure",
  },
];

const NavContentEx = () => {
  const {
    state: { voice },
  } = useContext(AppContext);

  const [selected, setSelected] = useState(
    list.findIndex((x) => x.to === window.location.pathname)
  );

  const handleClick = (i: number) => {
    if (i !== 3) setSelected(i);
    else {
      const speech = new Speech();
      speech.setLanguage(voice.lang);
      speech.setVoice(voice.name);
      speech.speak({
        text: "Help!",
      });
    }
  };

  return (
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
      <Divider style={{ margin: "12px 0" }} />
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
      <ListItem button>
        <ListItemIcon>
          <Icon>keyboard</Icon>
        </ListItemIcon>
        <ListItemText
          primary={"Onscreen Keyboard"}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </List>
  );
};

export default NavContentEx;
