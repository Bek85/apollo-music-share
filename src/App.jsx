import "./App.css";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongPlayer from "./components/SongPlayer";
import SongList from "./components/SongList";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Header />
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <AddSong />
              <SongList />
            </Grid>
            <Grid item xs={12} md={5}>
              <SongPlayer />
            </Grid>
          </Grid>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
