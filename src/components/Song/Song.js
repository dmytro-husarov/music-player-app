import classes from './Song.module.scss'
import { usePlayerContext } from '../../context/Context'


const Song = () => {
  const { currentSongIndex, songs } = usePlayerContext()
  const { cover, name, artist } = songs[currentSongIndex]
  
  return (
    <div className={classes.Song}>
      <img src={cover} alt={name}/>
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  )
}

export default Song
