import axios from 'axios';
import { SongInformation } from '../../model';

export const searchForSongs = async (token: string, searchKey: string): Promise<SongInformation[]> => {
  const { data } = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchKey,
      type: 'track',
    },
  });

  const searchResult: { tracks: any } = data;

  return searchResult.tracks.items.map((value: any) => ({
    id: value.uri,
    albumName: value.album.name,
    songName: value.name,
    artistName: value.artists.map((artist: any, index: number) => (index < 3 ? artist.name : '')).join(' '),
  }));
};
