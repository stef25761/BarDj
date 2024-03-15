import { NextSongEntry, NextSongsList } from '../../components';
import { getUserQueue } from '../../utils';
import { useState } from 'react';
import { SongInformation } from '../../model';
import { useSetInterval } from '../../hooks';

export interface NextSongsListContainerProps {
  token: string;
}

export const NextSongsListContainer = (props: NextSongsListContainerProps) => {
  const { token } = props;
  const [currentQueue, setCurrentQueue] = useState<SongInformation[]>();
  useSetInterval(() => getUserQueue(token).then((value) => setCurrentQueue(value)));

  return currentQueue ? (
    <NextSongsList withQueueLength>
      {currentQueue.map((value, index) =>
        index === 0 ? (
          <NextSongEntry
            key={value.id}
            onVoteClick={(voted) => console.log('click', voted)}
            songName={value.songName}
            album={value.albumName}
            artists={value.artistName}
            id={value.id}
          />
        ) : (
          <NextSongEntry
            key={value.id}
            onVoteClick={(voted) => console.log('click', voted)}
            songName={value.songName}
            album={value.albumName}
            artists={value.artistName}
            id={value.id}
            withIcon
          />
        )
      )}
    </NextSongsList>
  ) : null;
};
