import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { GET_SONGS } from "./../graphql/queries";
import Song from "./Song";

export default function SongList() {
  const { data, loading, error } = useQuery(GET_SONGS);

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

  if (error) {
    return <div>Error fetching songs...</div>;
  }
  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}
