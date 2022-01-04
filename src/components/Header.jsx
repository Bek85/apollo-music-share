import { HeadsetTwoTone } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

import React from "react";

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <HeadsetTwoTone />
          <Typography className={classes.title} variant="h6" component="h1">
            Apollo Music Share
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
