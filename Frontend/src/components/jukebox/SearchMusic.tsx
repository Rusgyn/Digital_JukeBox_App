import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SearchMusicResult from '../../../../Backend/src/types/jukeBox/searchMusicResultTypes';
import sortTracksByTitle from '../../utils/musicUtils'

const SearchMusic = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchMusicResult[]>([]);
  const [clearedResult, setClearedResult] = useState(false);
  const [selectedSong, setSelectedSong] = useState([]); //temp storage of selected song/s
  const [isSongSelected, setIsSongSelected] = useState(false); // condition that checks the song checkbox.
  
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

  const handleSelectedSong = (e: any) => {
    console.log("handleSelectedSong => ", e.target.checked);
    setIsSongSelected(e.target.checked);

  }

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
                      <audio controls>
                        <source src={searchResult.preview} type="audio/mp3" />
                      </audio>  
                    </td>
                    <td>
                      <input 
                        type="checkbox"
                        id="selectedSong"
                        name="selectedSong"
                        checked={isSongSelected}
                        value={searchResult.id}
                        onChange={handleSelectedSong}/>
                      ID: {searchResult.id} {/* This is an External ID */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchMusic;