import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3} style={{ paddingTop: 80 }}>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={{
            position: "fixed",
            width: "100%",
            right: 20,
          }}
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
