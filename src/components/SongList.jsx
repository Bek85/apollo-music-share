import { useQuery, useSubscription } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { GET_SONGS } from "./../graphql/subscriptions";
import Song from "./Song";

export default function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS);

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
