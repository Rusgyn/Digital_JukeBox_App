// Component that shows the list of songs
// End-user can hit "Like" voting. Maybe switch or check.
// only login user can view this page
// Playlist is organized as per number or likes or as per created_at
// (optional) song preview
// column: #, title, artist, cover, like

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import Switch from 'react-switch';
import axios from "axios";
// Types
import { PlaylistItem } from '../../../../Backend/src/types/jukeBox/playlistTypes';
// Utilities
import useSongPreview from "../../utils/audioUtils";
import { formatDuration } from '../../utils/durationUtils';
import { sortTracksByLike } from "../../utils/musicUtils";

const JukeBoxPlaylist = () => {

  const navigate = useNavigate();
  const { handlePlay, playingTrack } = useSongPreview(); // Use the preview function
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<PlaylistItem[] | []>([]);
  const [likedSongs, setLikedSongs] = useState<Set<bigint>>(new Set());

  useEffect (() => {
    const fetchPlaylist = async() => {
      try {
        setLoading(true);
        const response = await axios.get<PlaylistItem[]>('/jb-playlist');
        console.log("The playlist: ", response.data);

        const sortedPlaylist = sortTracksByLike(response.data);
        setPlaylist(sortedPlaylist);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching songs: ", error);
      }
    };
    fetchPlaylist();
  }, []);

  const handleMainNavigation = () => {
    navigate('/');
  };

  const isSongLiked = (songId: bigint) => likedSongs.has(songId);

  const handleFavoriteSong = async (song_external_id: bigint) => {
    try {
      const isLiked = isSongLiked(song_external_id); //Checked if user "liked" the song.

      const response = await axios.patch(`/music-fav/${song_external_id}/like`, {
        action: isLiked ? "unlike" : "like"
      });

      if (response.data) {
        setLikedSongs(prev => {
          const newLikedSongs = new Set(prev); // Create a new Set instance
          if (isLiked) {
            newLikedSongs.delete(song_external_id);
          } else {
            newLikedSongs.add(song_external_id);
          }
          return newLikedSongs;
        });
      }

    } catch (error) {
      console.log("Error when attempting to update LIKE");
    }
       
    console.log("You hit Favorite!");
  }

  return (
    <div>
      <h2> JukeBox Playlist Component</h2>
      <button onClick={() => {navigate(-1)}}>Back</button>
      <button onClick={handleMainNavigation}>Main</button>

      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Play</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
            ) : (
              playlist.map((song, index) => (
                <tr key={index}>
                  <td>{(index + 1).toString().padStart(3, '0')}</td>
                  <td>
                    <button onClick={() => handlePlay(song.preview)}>
                      {playingTrack === song.preview ? <FaPause /> : <FaPlay />}
                    </button>
                  </td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{formatDuration(song.duration)}</td>
                  <td>
                    <label>
                      <Switch
                        checked={isSongLiked(song.song_external_id)} //boolean
                        onChange={() => handleFavoriteSong(song.song_external_id)}
                        />
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JukeBoxPlaylist;