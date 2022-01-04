import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import { Grid, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 80,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
  },
  songContainer: {
    position: "fixed",
    width: "100%",
    right: 20,
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      width: "100%",
      left: -10,
      bottom: 0,
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid className={classes.container} container spacing={3}>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5} className={classes.songContainer}>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
