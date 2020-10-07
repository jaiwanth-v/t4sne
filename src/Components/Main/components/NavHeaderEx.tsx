import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const NavHeaderEx = ({ collapsed }: any) => <></>;

NavHeaderEx.propTypes = {
  collapsed: PropTypes.bool,
};
NavHeaderEx.defaultProps = {
  collapsed: false,
};

export default NavHeaderEx;
