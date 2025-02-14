export interface Playlist {
  id?: number;
  song_external_id: bigint;
  title: string;
  song_like: number;
  created_at: Date;
  updated_at: Date
};

export interface SelectedSong {
  id: number; //external API id number from Search result
  title: string,
};

export interface PlaylistItem {
  id: number;
  song_external_id: bigint;
  title: string;
  song_like: number;
  preview: string; // song audio preview
  duration: number; // song length
  artist: string; // artist name
  album: string; //cover name
  album_cover_small: string; //cover image
  album_cover_medium: string; //cover image
  album_cover_big: string //cover image
};

export interface FavoriteSong {
  id: number;
  title: string;
  song_like: number
};