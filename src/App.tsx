import './App.scss';
import { useEffect, useState } from 'react';
import { Scope } from './constant';
import { NextSongsListContainer, SongViewContainer } from './container';
import { SearchFieldContainer } from './container/search-field-container';

function App() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:5173';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const [token, setToken] = useState<string | null | undefined>('');

  useEffect(() => {
    const hash = window.location.hash;
    let token: string | null | undefined = window.localStorage.getItem('token');

    if (token === null && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        ?.split('=')[1];

      window.location.hash = '';
      if (token) {
        window.localStorage.setItem('token', token);
      }
    }

    setToken(token);
  }, []);

  return (
    <div className="app">
      {!token && (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${Scope.USER_READ_CURRENTLY_PLAYING} ${Scope.USER_READ_PLAYBACK_STATE} ${Scope.USER_MODIFY_PLAYBACK_STATE}`}
        >
          Login to Spotify
        </a>
      )}
      {token && (
        <>
          <header>
            <h1 className="app__header">Hasis Jukebox</h1>
          </header>
          <section className={'app__content'}>
            <section className="content">
              <section className={'content__search-field'}>
                <SearchFieldContainer token={token} />
              </section>

              <section className={'content__songArea'}>
                <SongViewContainer token={token} />
                <NextSongsListContainer token={token} />
              </section>
            </section>
          </section>
          <footer className={'app__footer'}>
            <span className="footer__text">
              <span>Displayed the current song and the next five once.</span>
              <span>vote the next song click or tap on the icon next to the list item.</span>
              <span> To vote the next song click or tap on the icon next to the list item.</span>
              <span>
                add and search a song, use in the right corner the search icon. After click or tap the search field
                appears.
              </span>
            </span>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
