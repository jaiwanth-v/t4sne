import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../../../../../../Context/App.context";
import { SPEAK_TEXT } from "../../../../../../Reducers/actionTypes";
import InteractionsList from "../InteractionsList";
import TabPanel from "./TabPanel";
import "./Interactions.scss";

interface Props {}

const Interactions: React.FC<Props> = () => {
  const [value, setValue] = React.useState(0);
  const { dispatch } = useContext(AppContext);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs variant="scrollable" value={value} onChange={handleChange}>
          {InteractionsList.map((item: typeof InteractionsList[0]) => (
            <Tab label={item.type} key={item.type} />
          ))}
        </Tabs>
      </AppBar>
      {InteractionsList.map((item, idx) => (
        <TabPanel index={idx} value={value}>
          <div className="messages-container d-flex flex-wrap justify-content-center">
            {item.list.map((msg) => (
              <div
                className="message-card grow"
                onClick={() => dispatch({ type: SPEAK_TEXT, payload: msg })}
              >
                <p className="message">{msg}</p>
              </div>
            ))}
          </div>
        </TabPanel>
      ))}
    </div>
  );
};

export default Interactions;
