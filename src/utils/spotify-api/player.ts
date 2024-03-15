import axios from 'axios';
import { GET_CURRENTLY_PLAYING_TRACK, GET_USER_QUEUE } from '../../constant';
import { SongInformation } from '../../model';

export const getCurrentPlayingTrack = async (token: string): Promise<SongInformation> => {
  const { data } = await axios.get(GET_CURRENTLY_PLAYING_TRACK, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    id: data.item.id,
    artistName: data.item.artists[0].name,
    songName: data.item.name,
    albumName: data.item.album.name,
    albumCover: data.item.album.images[1].url,
  };
};
export const getUserQueue = async (token: string): Promise<SongInformation[]> => {
  const { data } = await axios.get(GET_USER_QUEUE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const queue: [] = data.queue;

  return queue.map((value: any) => ({
    id: value.id,
    artistName: value.artists[0].name,
    songName: value.name,
    albumName: value.album.name,
    albumCover: value.album.images[1].url,
  }));
};

export const addToUserQueue = async (token: string, uri: string) => {
  const { data } = await axios({
    method: 'post',
    url: `${GET_USER_QUEUE}?uri=${uri}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
