import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import "./Main.scss";
import Speech from "speak-tts";
import {
  Root,
  getHeader,
  getDrawerSidebar,
  getSidebarTrigger,
  getSidebarContent,
  getCollapseBtn,
  getContent,
} from "@mui-treasury/layout";
import {
  getDefaultScheme,
  getStandardScheme,
  getFixedScheme,
  getContentBasedScheme,
  getCozyScheme,
  getMuiTreasuryScheme,
} from "@mui-treasury/layout/presets";
import HeaderEx from "./components/ContentPages/Header/HeaderEx";
import NavContentEx from "./components/Sidebar/Sidebar";
import MainContent from "./components/ContentPages/MainContent/MainContent";
import Yesno from "./components/ContentPages/Yesno/Yesno";
import Interactions from "./components/ContentPages/Interactions/InteractionsPage/Interactions";
import Configure from "./components/ContentPages/Configure/Configure";
import { Route, Switch } from "react-router-dom";
import { AppContext } from "../../Context/App.context";
import { INIT_STATE } from "../../Reducers/actionTypes";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);

const presets: any = {
  createDefaultLayout: getDefaultScheme(),
  createStandardLayout: getStandardScheme(),
  createFixedLayout: getFixedScheme(),
  createContentBasedLayout: getContentBasedScheme(),
  createCozyLayout: getCozyScheme(),
  createMuiTreasuryLayout: getMuiTreasuryScheme(),
};
interface Props {
  isNew: boolean;
}

const Main: React.FC<Props> = ({ isNew }) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (isNew) {
      const voice = {
        name: state.voice.name,
        lang: state.voice.lang,
      };
      window.localStorage.setItem("voice", JSON.stringify(voice));
    } else {
      const setVoice = async () => {
        const unparsedVoiceObject: any = window.localStorage.getItem("voice");
        const storedVoice = JSON.parse(unparsedVoiceObject);
        const speech = new Speech();
        const data = await speech.init();
        const index = data.voices.findIndex(
          (x: any) => x.name.toString() === storedVoice.name
        );
        dispatch({ type: INIT_STATE, payload: data.voices[index] });
      };
      if (!state.voice.name) {
        setVoice();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preset = "createCozyLayout";
  const data = {
    header: true,
    nav: true,
    content: true,
    footer: true,
  };
  return (
    <div className="dashboard">
      <StylesProvider injectFirst>
        <CssBaseline />
        <Root scheme={presets[preset]}>
          <>
            <Header>
              <Toolbar>
                <SidebarTrigger sidebarId="primarySidebar" />
                {data.header && <HeaderEx />}
              </Toolbar>
            </Header>
            <DrawerSidebar sidebarId="primarySidebar">
              <SidebarContent>{data.nav && <NavContentEx />}</SidebarContent>

              <CollapseBtn />
            </DrawerSidebar>
            <Content>
              <Switch>
                <Route exact path="/" component={MainContent} />
                <Route path="/yesno" component={Yesno} />
                <Route path="/interactions" component={Interactions} />
                <Route path="/configure" component={Configure} />
              </Switch>
            </Content>
          </>
        </Root>
      </StylesProvider>
    </div>
  );
};

export default Main;
