// Component that shows the list of songs
// End-user can hit "Like" voting. Maybe switch or check.
// only login user can view this page
// Playlist is organized as per number or likes or as per created_at
// (optional) song preview
// column: #, title, artist, cover, like

import { useNavigate } from "react-router-dom";

const JukeBoxPlaylist = () => {

  const navigate = useNavigate();

  const handleMainNavigation = () => {
    navigate('/');
  };

  const handleLikeSong = () => {
    alert("You hit the like button!");
  };

  return (
    <div>
      <h2> JukeBox Playlist Component</h2>
      <button onClick={() => {navigate(-1)}}>Back</button>
      <button onClick={handleLikeSong}>Like</button>
      <button onClick={handleMainNavigation}>Main</button>
    </div>
  );
};

export default JukeBoxPlaylist;