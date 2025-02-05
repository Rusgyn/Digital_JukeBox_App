import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SearchResult from '../../../../Backend/src/types/jukeBox/searchMediaResultTypes';
import useCheckSession from '../../hooks/useCheckSession';

const SearchMusic = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [clearedResult, setClearedResult] = useState(false);
  
  const isSessionChecked = useCheckSession();

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
        console.log("Search Music response: ", response.data.data);
        setSearchResults(response.data.data || []);
        setSearchQuery("");  
      } catch(error) {
        console.error('Error searching for music: ', error);
      } finally {
        setClearedResult(false);
      }
    }, 200);
  };

  return (
    <div>
      {isSessionChecked ? <p>Session Verified</p> : <p>Checking session...</p>}
      <h2> This is SearchMusic Component </h2>
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
                <th>Album</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Preview</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {clearedResult ? (
                <tr>
                  <td colSpan={6}>Loading...</td>
                </tr>
              ) : (
                searchResults.map((searchResult, index) => (
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
                      <input type="checkbox" />
                      ID: {searchResult.id}
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