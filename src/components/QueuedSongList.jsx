import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import QueuedSong from "@/components/QueuedSong";

const useStyles = makeStyles((theme) => ({
  QueuedSongListContainer: {
    margin: "10px 0",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function QueuedSongList({ queue }) {
  const classes = useStyles();
  // const song = {
  //   title: "LUNE",
  //   artist: "MOON",
  //   thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg",
  // };
  return (
    <div className={classes.QueuedSongListContainer}>
      <Typography color="textSecondary" variant="button">
        QUEUE ({queue.length})
      </Typography>
      {queue.map((song, i) => (
        <QueuedSong key={i} song={song} />
      ))}
    </div>
  );
}
