import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SearchResult from '../../../../Backend/src/types/jukeBox/searchMediaResultTypes';

const SearchMusic = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSessionChecked, setIsSessionChecked] = useState(false); //control rendering
  const [loading, setLoading] = useState(false);//temporarily disable search while fetching.

  // Check the session
  useEffect(() => {
    const checkSession = async() => {
      try {
        const response = await axios.get('/jukeBox/check-session', { withCredentials: true }); 

        if (!response.data.loggedIn) {
          navigate('/admin-login', { replace: true } );
          return;
        }

      } catch (error) {
        console.error("Error checking session Frontend: ", error);
        navigate('/admin-login', { replace: true } );
        return;
      }
      setIsSessionChecked(true); // Mark session is checked
    }
    
    checkSession();
  }, [navigate]);

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  const handleSearch = async() => {

    if (!searchQuery.trim()) {
      console.warn("Please enter a search term");
      alert("Please enter a search term")
      return;
    }

    setLoading(true);
    
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
      setLoading(false);
    }
  };

  if (!isSessionChecked) return null; // it wont render until session is checked
  // if (!isResultCleared) return null;

  return (
    <div>
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
              {searchResults.map((searchResult, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchMusic;