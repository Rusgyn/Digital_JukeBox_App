interface SearchMusicResult {
  album: {
    cover_small: string;
  }
  artist: {
    name: string;
  }
  external_id: number; //External API id,
  preview: string;
  title: string;
}

export default SearchMusicResult;