import './next-songs-list.scss';
import { ReactElement } from 'react';

export interface NextSongsListProps {
  children: ReactElement[];
  withQueueLength?: boolean;
}

export const NextSongsList = (props: NextSongsListProps) => {
  const { children, withQueueLength } = props;

  return (
    <section className="next-songs">
      <ul className="next-songs__list">
        {children.slice(0, 5).map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
      {withQueueLength && <span className="next-songs__count">{`current queue length: ${children.length}`}</span>}
    </section>
  );
};
