import classnames from 'classnames';
import './song-view.scss';

export interface SongViewProps {
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
   * The cover.
   */
  albumCover?: string;
  withShadow?: boolean;
}

/**
 * Displayed a song with name, album and artists, optional with the album cover as image.
 * @param props The Component props.
 * @returns The component.
 */
export const SongView = (props: SongViewProps) => {
  const { withShadow, songName, artists, album, albumCover } = props;
  return (
    <section className={classnames('song-view', { 'song-view--with-shadow': withShadow })}>
      {albumCover && <img className="song-view__album-cover" alt="album cover" src={albumCover} />}
      <section className="song-view__current-song">
        <span className="current-song__label">{songName}</span>
        <section className="current-song__sub-label">
          <span>{`${artists}, ${album}`}</span>
        </section>
      </section>
    </section>
  );
};
