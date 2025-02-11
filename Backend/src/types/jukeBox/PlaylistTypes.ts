export interface Playlist {
  id?: number;
  song_external_id: bigint;
  title: string;
  song_like: number;
  created_at: Date;
  updated_at: Date;
};

export interface SelectedSong {
  id: number; //external API id number from Search result
  title: string;
};