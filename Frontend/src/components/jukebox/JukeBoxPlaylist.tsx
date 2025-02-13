// Component that shows the list of songs
// End-user can hit "Like" voting. Maybe switch or check.
// only login user can view this page
// Playlist is organized as per number or likes or as per created_at
// (optional) song preview
// column: #, title, artist, cover, like

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlaylistItem } from '../../../../Backend/src/types/jukeBox/playlistTypes';
import useSongPreview from "../../utils/audioUtils";
import { FaPlay, FaPause } from "react-icons/fa";
import Switch from 'react-switch';

const JukeBoxPlaylist = () => {

  const navigate = useNavigate();
  const { handlePlay, playingTrack } = useSongPreview(); // Use the preview function
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<PlaylistItem[] | []>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect (() => {
    const fetchPlaylist = async() => {
      try {
        setLoading(true);
        const response = await axios.get<PlaylistItem[]>('/jb-playlist');
        console.log("The playlist: ", response.data);
        setPlaylist(response.data);
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

  const handleLikeSong = (checked: any) => {
    setIsChecked(checked);
    //alert("You hit the like button!");
  };

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
                  <td>{song.duration}</td>
                  <td>
                    <label>
                      <Switch
                        checked={isChecked}
                        value={song.id}
                        onChange={handleLikeSong}
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