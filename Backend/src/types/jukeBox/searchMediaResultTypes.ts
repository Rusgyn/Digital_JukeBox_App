interface SearchMediaResult {
  album: {
    cover_small: string;
  }
  artist: {
    name: string;
  }
  id: number; //External API id
  preview: string;
  title: string;
}

export default SearchMediaResult;