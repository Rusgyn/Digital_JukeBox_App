import db from "../../database";
import { Playlist } from '../../../types/jukeBox/playlistTypes';

// Add song
const addSong = async (playlist: Playlist): Promise<Playlist> => {
  try {
    const result = await db.query('INSERT INTO playlists (song_external_id) VALUES ($1) RETURNING *', [playlist.song_external_id]);
    return result.rows[0] as Playlist;
  } catch(error) {
    console.error('Error adding song to the playlist: ', error);
    throw error;
  }
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

// Get song by external id
const getSongByExternalId = async (song_ext_id: number): Promise<Playlist> => {
  try {
    const result = await db.query('SELECT * FROM playlists WHERE song_external_id = $1', [song_ext_id]);
    return result.rows[0] as Playlist;
  } catch (error) {
    console.error (`Error fetching song with external ID ${song_ext_id}`);
    throw error;
  }
}

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

// Delete Playlist
const deletePlaylist = async (): Promise<{message: string}> => {
  try {
    const result = await db.query('TRUNCATE TABLE playlists RESTART IDENTITY;');
    return { message: "Playlist cleared successfully" };
  } catch(error) {
    console.error('Error clearing the playlist. Error - ', error);
    throw error;
  }
}

// Delete the Track/song
const deleteTrack = async (playlist: Playlist): Promise<{ message: string }> => {
  try {
    const queryString = 'DELETE FROM playlists WHERE id = $1;';

    const result = await db.query(queryString, [playlist.id]);

    if (result.rowCount === 0) {
      return { message: `No song with ID# ${playlist.id} in the Playlist.` };
    }

    return { message: `Track with ID# ${playlist.id} deleted successfully.`};

  } catch(error) {
    console.error('Error deleting the track/song. Error - ', error);
    throw error;
  }
}

export default {
  addSong,
  getAllSongs,
  getSongByExternalId,
  updateSongLike,
  deletePlaylist,
  deleteTrack
}