import { createContext } from "react";

const SongContext = createContext({
  song: {
    id: "1edafa19-2db0-4754-a1f0-2e0be61cb691",
    title: "Believer",
    artist: "Imagine Dragons",
    thumbnail: "http://img.youtube.com/vi/7wtfhZwyrcc/0.jpg",
    urL: "https://www.youtube.com/watch?v=7wtfhZwyrcc",
    duration: 217,
  },
  isPlaying: false,
});

export default SongContext;
