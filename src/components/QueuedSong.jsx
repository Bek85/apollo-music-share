import { useMutation } from "@apollo/client";
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGrap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: "hidden",
  },
});

export default function QueuedSong({ song }) {
  const classes = useStyles();
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  }
  return (
    <div className={classes.container}>
      <Avatar
        className={classes.avatar}
        src={song.thumbnail}
        alt="Song thumbnail"
      />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} varinat="subtitle2">
          {song.title}
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="body"
        >
          {song.artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
