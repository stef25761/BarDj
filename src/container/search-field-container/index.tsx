import { SearchField } from '../../components';
import { addToUserQueue, searchForSongs } from '../../utils';
import { useCallback, useState } from 'react';
import { SongInformation } from '../../model';

export interface SearchFieldContainerProps {
  token: string;
}

export const SearchFieldContainer = (props: SearchFieldContainerProps) => {
  const { token } = props;
  const [input, setInput] = useState<string>('');
  const [songs, setSongs] = useState<SongInformation[]>([]);
  const handleOnInputChange = (value: string) => {
    if (value) {
      searchForSongs(token, value).then(setSongs);
    } else {
      setSongs([]);
    }

    setInput(value);
  };
  const handleClearField = useCallback(() => {
    setSongs([]);
    setInput('');
  }, []);
  const handleOnSongClick = (uri: string) => {
    addToUserQueue(token, uri).then(console.log);
  };
  return (
    <SearchField
      clearEntries={handleClearField}
      input={input}
      onInputChange={handleOnInputChange}
      listElements={songs.slice(0, 5)}
      onSongClick={handleOnSongClick}
    />
  );
};
