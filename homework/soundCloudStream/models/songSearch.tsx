import User from './user';

export default interface SongSearch {
  id: number;
  title: string;
  duration: number;
  stream_url: URL;
  artwork_url: URL;
  genre: string;
  favoritings_count: number;
  playback_count: number;
  user: User;
}
