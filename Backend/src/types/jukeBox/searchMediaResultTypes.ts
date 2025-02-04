interface SearchMediaResult {
  album: {
    cover_small: string;
  }
  title: string;
  artist: {
    name: string;
  }
  preview: string;
}

export default SearchMediaResult;