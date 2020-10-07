import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";

const styles: any = ({
  spacing,
  transitions,
  breakpoints,
  palette,
  shape,
}: any) => ({
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    marginRight: 8,
    borderRadius: shape.borderRadius,
    background: 1210,
    "&:hover": {
      background: palette.grey[300],
    },
    marginLeft: 0,
    width: "100%",
    [breakpoints.up("sm")]: {
      marginLeft: spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    borderRadius: 4,
    paddingTop: spacing(1),
    paddingRight: spacing(1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(10),
    transition: transitions.create("width"),
    width: "100%",
    [breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
});

const HeaderEx = ({ classes, screen }: any) => (
  <>
    <Typography noWrap color={"textSecondary"} className={classes.header}>
      Welcome
    </Typography>
    <div className={classes.grow} />
    <div className={classes.search}>
      <div className={classes.searchIcon}></div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  </>
);

HeaderEx.propTypes = {
  screen: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
};
HeaderEx.defaultProps = {
  screen: null,
};

export default withStyles(styles)(HeaderEx);
