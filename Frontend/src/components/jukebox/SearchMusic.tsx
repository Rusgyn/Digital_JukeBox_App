import { useState } from "react";
import axios from "axios";

interface SearchResult {
  title: string;
  artist: {
    name: string;
  }
  preview: string;
}

const SearchMusic = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async() => {

    if (!searchQuery.trim()) {
      console.warn("Please enter a search term");
      return;
    }
    
    try {
      const response = await axios.get('/jukeBox/media-search', {
        params: {
          searchQuery
        }
      })
      console.log("Search Music response: ", response.data);
      setSearchResults(response.data.data);
      setSearchQuery("");
    } catch(error) {
      console.error('Error searching for music: ', error);
    }
  };

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
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((searchResult, index) => (
                <tr key={index}>
                  <td>{(index + 1).toString().padStart(3, '0')}</td>
                  <td>{searchResult.title}</td>
                  <td>{searchResult.artist.name}</td>
                  <td>{searchResult.preview}</td>
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