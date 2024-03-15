import { getCurrentPlayingTrack } from '../../utils';
import { SongView } from '../../components';
import { useState } from 'react';
import { SongInformation } from '../../model';
import { useSetInterval } from '../../hooks';

export interface SongViewContainerProps {
  token: string;
}

export const SongViewContainer = (props: SongViewContainerProps) => {
  const { token } = props;
  const [currentSong, setCurrentSong] = useState<SongInformation>();
  useSetInterval(() => getCurrentPlayingTrack(token).then((value) => setCurrentSong(value)));

  return (
    <SongView
      songName={currentSong?.songName ?? ''}
      album={currentSong?.albumName ?? ''}
      artists={currentSong?.artistName ?? ''}
      albumCover={currentSong?.albumCover ?? ''}
      withShadow
    />
  );
};
