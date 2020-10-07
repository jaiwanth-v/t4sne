import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/App.context";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
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
import HeaderEx from "./components/HeaderEx";
import NavContentEx from "./components/NavContentEx";
import ContentEx from "./components/ContentEx";

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
          {({ state: { sidebar } }) => (
            <>
              <Header>
                <Toolbar>
                  <SidebarTrigger sidebarId="primarySidebar" />
                  {data.header && <HeaderEx />}
                </Toolbar>
              </Header>
              <DrawerSidebar sidebarId="primarySidebar">
                <SidebarContent>
                  {data.nav && <NavContentEx />}
                  {/* <NavHeaderEx collapsed={sidebar.primarySidebar.collapsed} /> */}
                </SidebarContent>

                <CollapseBtn />
              </DrawerSidebar>
              <Content>
                <ContentEx />
              </Content>
            </>
          )}
        </Root>
      </StylesProvider>
    </div>
  );
};

export default Main;
