interface SearchMusicResult {
  album: {
    cover_small: string;
  }
  artist: {
    name: string;
  }
  id: number; //External API id. e.g. id: 2542703
  preview: string;
  title: string;
}

export default SearchMusicResult;