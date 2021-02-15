import { usePlayerContext } from '../../context/Context'
import classes from './Library.module.scss'
import LibrarySong from './LibrarySong'


const Library = () => {
  const { songs, currentSongIndex, matches } = usePlayerContext()
  const clsActiveLibrary = matches('library.opened') ? classes.ActiveLibrary : ''

  return (
    <div className={[classes.Library, clsActiveLibrary].join(' ')}>
      <h2>Library</h2>
      <div>
        {songs.map((song, index) => (
          <LibrarySong
            key={song.id}
            index={index}
            active={index === currentSongIndex}
            song={song}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
