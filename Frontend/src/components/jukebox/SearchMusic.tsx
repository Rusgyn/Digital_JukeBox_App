import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SearchMusicResult from '../../../../Backend/src/types/jukeBox/searchMusicResultTypes';
import { SelectedSong } from '../../../../Backend/src/types/jukeBox/playlistTypes';
import sortTracksByTitle from '../../utils/musicUtils';
import useSongPreview from "../../utils/audioUtils";
import { FaPlay, FaPause } from "react-icons/fa";

const SearchMusic = () => {

  const navigate = useNavigate();
  const { handlePlay, playingTrack } = useSongPreview(); // Use the preview function
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchMusicResult[]>([]);
  const [clearedResult, setClearedResult] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SelectedSong[]>([]);
   
  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  const handleSearch = async() => {

    if (!searchQuery.trim()) {
      console.warn("Please enter a search term");
      alert("Please enter a search term")
      return;
    };
    
    setClearedResult(true);

    setTimeout( async()=> {
      try {
        const response = await axios.get('/jukeBox/media-search', {
          params: {
            searchQuery
          }
        })
        setSearchResults(response.data.data || []);
        setSearchQuery("");  
      } catch(error) {
        console.error('Error searching for music: ', error);
      } finally {
        setClearedResult(false);
      }
    }, 200);
  };

  const handleSelectedSong = (e: React.ChangeEvent<HTMLInputElement>, song: SearchMusicResult) => {
    const isSongSelected = e.target.checked; // => boolean
    //const newSelectedSong = parseInt(e.target.value); //convert ID to number. Checkbox Value attribute has "string" typeOf hence convert.
    console.log("Is Checkbox checked: ", isSongSelected);

    const newSelectedSong: SelectedSong = {
      id: song.id,
      title: song.title,
    };

    console.log("The newSelectedSong is: ", newSelectedSong);
    
    if (isSongSelected) {
      setSelectedSong( [...selectedSong, newSelectedSong] );
    } else {
      setSelectedSong(selectedSong.filter((song) => song.id !== newSelectedSong.id));
    };  
  };

  // Add to jukeBox Playlist
  const handleAddToPlaylist = async() => {

    if (selectedSong.length === 0) {
      console.log("Please choose a song")
      alert("Select a song/s");
      return;
    };

    try {
      const response = await axios.post('/jukeBox/add-music', {
        selectedSong
      });

      setSelectedSong([]); //clear the selected song/s after post

      console.log("Request is now complete. We added: ", response.data.addedSongs);
      console.log("However, we prevent adding an existing song. We skipped: ", response.data.skippedSongs);

      if (response.status === 201) {
        setSearchResults([]); // clear the result page when success.
        navigate('/media-search');
      }

      //return response.data; // *This can be used for future enhancement.
    } catch (error: any) {
      console.error('Error occurred while adding song/s to Playlist: ', error);
      throw new Error ('An error occurred. Please try again.');
    }
  };

  // Sort the searchResults array by title
  const sortedSearchResults = sortTracksByTitle(searchResults);

  return (
    <div>
      <h2> SearchMusic Component </h2>
      <button 
          className="#"
          type='button'
          value='back'
          onClick={() => {navigate(-1)}}>Back</button> {/* Go back prev page */}
      <div>
        <input
          type="text"
          placeholder="Search here ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}>Search</button>
        <button onClick={handleDashboardNavigation}>
          Dashboard
        </button>
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Preview</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clearedResult ? (
                <tr>
                  <td colSpan={6}>Loading...</td>
                </tr>
              ) : (
                sortedSearchResults.map((searchResult, index) => (
                  <tr key={index}>
                    <td>{(index + 1).toString().padStart(3, '0')}</td>
                    <td>
                      <img 
                        src={searchResult.album.cover_small}
                        alt={searchResult.title}>
                      </img>
                    </td>
                    <td>{searchResult.title}</td>
                    <td>{searchResult.artist.name}</td>
                    <td>
                      <button onClick={() => handlePlay(searchResult.preview)}>
                        {playingTrack === searchResult.preview ? <FaPause /> : <FaPlay />}
                      </button>
                    </td>
                    <td>
                      <input 
                        type="checkbox"
                        id={`selectedSong-${searchResult.id}`}
                        name="selectedSong"
                        checked={
                          selectedSong.some((song) => 
                            song.id === searchResult.id )
                        }
                        value={searchResult.id}
                        onChange={(e) => handleSelectedSong(e, searchResult)}/>
                      ID: {searchResult.id} {/* This is an External ID */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <button onClick={ handleAddToPlaylist }> Add to Playlist </button>
      </div>
    </div>
  );
};

export default SearchMusic;