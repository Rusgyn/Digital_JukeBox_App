import db from "../../database";

interface Playlist {
  id: number;
  song_external_id: number;
  song_like: number;
};

// Get all songs
const getAllSongs = async (): Promise<Playlist[]> => {
  try {
    const result = await db.query('SELECT * FROM playlists ORDER BY created_at ASC, updated_at ASC;');
    return result.rows as Playlist[];
  } catch(error) {
    console.error('Error fetching all songs: ', error);
    throw error;
  }
};

// Update number of likes
const updateSongLike = async (playlist: Playlist): Promise<Playlist> => {
  try {
    const queryString = 'UPDATE playlists SET song_like= $1 WHERE id = $2 RETURNING *;';
    const result = await db.query(queryString, [playlist.song_like, playlist.id]);
    return result.rows[0] as Playlist;
  } catch(error) {
    console.error('Error updating number of song likes: ', error);
    throw error;
  }
};

export default {
  getAllSongs,

}