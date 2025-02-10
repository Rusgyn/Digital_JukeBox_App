// music-related utilities

import SearchMusicResult from "../../../Backend/src/types/jukeBox/searchMusicResultTypes";

// Sorted Music by title
const sortTracksByTitle = (music: SearchMusicResult[]) => {
  return music.sort((a, b) => a.title.localeCompare(b.title));
};

export default sortTracksByTitle;

