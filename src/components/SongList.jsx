import { CircularProgress } from "@mui/material";
import Song from "./Song";

export default function SongList() {
  let loading = false;

  const song = {
    title: "LUNE",
    artist: "MOON",
    thumbnail: "http://img.youtube.com/vi/--ZtUFsIgMk/0.jpg",
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song key={i} song={song} />
      ))}
    </div>
  );
}
