import './search-field.scss';
import { Icon } from '@mui/material';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { SongInformation } from '../../model';
import { NextSongsList } from '../next-songs-list';
import { NextSongEntry } from '../next-song-entry';

export interface SearchFieldProps {
  onInputChange: (_input: string) => void;
  input: string;
  listElements: SongInformation[];
  onSongClick: (_id: string) => void;
  clearEntries?: () => void;
}

export const SearchField = (props: SearchFieldProps) => {
  const { listElements, input, onInputChange, onSongClick, clearEntries = () => {} } = props;
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);

  useEffect(() => {
    if (!isTextFieldVisible) {
      clearEntries();
    }
  }, [clearEntries, isTextFieldVisible]);
  const toggleTextField = () => {
    setTextFieldVisible(!isTextFieldVisible);
  };
  const handleOnEntryClick = (id: string) => {
    onSongClick(id);
    setTextFieldVisible(false);
  };

  return (
    <section className={'search-field'}>
      <section className={'search-field__button-wrapper'}>
        <button onClick={toggleTextField}>
          <Icon fontSize="large">search</Icon>
        </button>
        <CSSTransition in={isTextFieldVisible} timeout={300} classNames="fade" unmountOnExit>
          <input
            type={'search'}
            className={classnames('button-wrapper__input')}
            onChange={(event) => onInputChange(event.target.value)}
            value={input}
            placeholder={'enter artist, song or album'}
          />
        </CSSTransition>
      </section>
      {listElements.length > 0 && isTextFieldVisible && (
        <NextSongsList>
          {listElements.slice(0, 5).map((value) => (
            <NextSongEntry
              key={value.id}
              songName={value.songName}
              album={value.albumName}
              artists={value.artistName}
              id={value.id}
              onEntryClick={handleOnEntryClick}
            />
          ))}
        </NextSongsList>
      )}
    </section>
  );
};
