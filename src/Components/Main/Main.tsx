import React from "react";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import "./Main.scss";

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
interface Props {}

const Main: React.FC<Props> = () => {
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
