import classes from './LibrarySong.module.scss'
import { usePlayerContext } from '../../context/Context'


const LibrarySong = ({ index, active, song }) => {
  const { send } = usePlayerContext()
  const { cover, name, artist } = song
  const clsSelectedSong = active ? classes.SelectedSong : ''

  return (
    <div className={[classes.LibrarySong, clsSelectedSong].join(' ')}
      onClick={() => send('SELECT_SONG', {index})}
    >
      <img src={cover} alt={name}/>
      <div className={classes.SongDiscription}>
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong
