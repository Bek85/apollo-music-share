import { useEffect, useState } from "react";
import { AddBoxOutlined, LinkOutlined } from "@mui/icons-material";
import ReactPlayer from "react-player";
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useMutation } from "@apollo/client";
import { ADD_SONG } from "@/graphql/mutations";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: "center",
  },
  thumbnail: {
    width: "90%",
  },
}));

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: "",
};

export default function AddSong() {
  const [dialog, setDialog] = useState(false);
  const [playable, setPlayable] = useState(false);
  const [url, setUrl] = useState("");
  const [song, setSong] = useState(DEFAULT_SONG);
  const [addSong, { error }] = useMutation(ADD_SONG);
  const classes = useStyles();

  useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  const handleSetDialog = () => {
    setDialog(false);
  };

  const handleChangeSong = (evt) => {
    const { name, value } = evt.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleAddSong = async () => {
    try {
      const { url, thumbnail, duration, title, artist } = song;

      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      // handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.error("Error adding song", error);
    }
  };

  // const handleCloseDialog = () => {};

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }
    setSong({
      ...songData,
      url,
    });
  };

  const getYoutubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  };

  const getSoundCloudInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  };

  const handleInputError = (field) => {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  };

  const { thumbnail, title, artist } = song;
  console.dir(error);

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleSetDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            className={classes.thumbnail}
            src={thumbnail}
            alt="Song thumbnail"
          />
          <TextField
            onChange={handleChangeSong}
            value={title}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleInputError("title")}
            helperText={handleInputError("title") && "Title is required"}
          />
          <TextField
            onChange={handleChangeSong}
            value={artist}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleInputError("artist")}
            helperText={handleInputError("artist") && "Artist is required"}
          />
          <TextField
            onChange={handleChangeSong}
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleInputError("thumbnail")}
            helperText={
              handleInputError("thumbnail") && "thumbnail is required"
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSong} variant="outlined" color="primary">
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        onChange={(evt) => setUrl(evt.target.value)}
        value={url}
        className={classes.urlInput}
        variant="standard"
        placeholder="Add Youtube or Soundcloud url"
        fullWidth
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkOutlined />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}
