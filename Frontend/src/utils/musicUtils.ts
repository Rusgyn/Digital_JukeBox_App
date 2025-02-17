// music-related utilities

import SearchMusicResult from "../../../Backend/src/types/jukeBox/searchMusicResultTypes";
import { PlaylistItem } from "../../../Backend/src/types/jukeBox/playlistTypes";

// Sorted Music Tracks by title
export const sortTracksByTitle = (music: SearchMusicResult[]) => {
  return music.sort((a, b) => a.title.localeCompare(b.title));
};

// Sorted Music by number of Likes, or created_at
export const sortTracksByLike = (music: PlaylistItem[]) => {
  return music.sort((a, b) => {
    if (b.song_like !== a.song_like) {
      return b.song_like - a.song_like; // Sort DESC
    }
    // If song_like is equal, then sort by created_at ASC.
    //return a.created_at.getTime() - b.created_at.getTime();
    return a.id - b.id;
    //getTime() ensure to have an accurate comparison of time
  })
};