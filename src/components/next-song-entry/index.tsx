import { Icon } from '@mui/material';
import './next-song-enry.scss';
import { useState } from 'react';
import classnames from 'classnames';

export interface NextSongEntryProps {
  id: string;
  /**
   * The Current song name.
   */
  songName: string;
  /**
   * Album wich the song belongs to.
   */
  album: string;
  /**
   * The artists of the song.
   */
  artists: string;
  /**
   * Indicate with vote button.
   */
  withIcon?: boolean;
  onVoteClick?: (_voted: boolean) => void;
  onEntryClick?: (_id: string) => void;
}

export const NextSongEntry = (props: NextSongEntryProps) => {
  const { onVoteClick = () => {}, onEntryClick = () => {}, id, withIcon, songName, artists, album } = props;
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const handleOnVoteClick = () => {
    setButtonDisabled((prevState) => !prevState);
    onVoteClick(!buttonDisabled);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <section className="next-song-entry" onClick={() => onEntryClick(id)}>
      {withIcon && (
        <button
          onClick={handleOnVoteClick}
          className={classnames('next-song-entry__vote-button', {
            'next-song-entry__vote-button--isDisabled': buttonDisabled,
          })}
        >
          <Icon fontSize="small">check_circle</Icon>
        </button>
      )}
      <section className="next-song-entry__song">
        <span className="song__label">{songName}</span>
        <section className="song__sub-label">
          <span>{`${artists}, ${album}`}</span>
        </section>
      </section>
    </section>
  );
};
