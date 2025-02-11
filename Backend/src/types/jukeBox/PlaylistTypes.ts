interface Playlist {
  id?: number;
  song_external_id: number;
  title: string;
  song_like: number;
  created_at: Date;
  updated_at: Date;
};

export default Playlist;