import React, { useRef } from 'react'
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa"
import classes from './Player.module.scss'
import { usePlayerContext } from '../../context/Context'
import { getTime, percentage } from '../../utils'

const Player = () => {
  const audioRef = useRef(null)
  const {duration, elapsed, currentSongIndex, songs, send, matches} = usePlayerContext()
  const currentSong = songs[currentSongIndex]

  return (
    <div className={classes.Player}>
      <div className={classes.TimeControl}>
        <p>{getTime(elapsed)}</p>
        <div className={classes.Track}
          style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}
        >
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={elapsed}
            onChange={e => send('DRAGGING', {value: e.target.value})}
          />
          <div className={classes.AnimateTrack}
            style={{transform: `translateX(${percentage(duration, elapsed)}%)`}}
          >
          </div>
        </div>
        <p>{duration ? getTime(duration) : '0:00'}</p>
      </div>
      <div className={classes.PlayControl}>
        <FaStepBackward onClick={() => send('SKIP_BACK')} size="1.5rem"/>
        {matches('player.paused') && <FaPlay onClick={() => send('PLAY')} size="2rem"/>}
        {matches('player.playing') && <FaPause onClick={() => send('PAUSE')} size="2rem"/>}
        <FaStepForward onClick={() => send('SKIP_FORWARD')} size="1.5rem"/>
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onCanPlay={() => send('LOADED', {audio: audioRef.current})}
        onTimeUpdate={() => send('TIMING')}
        onEnded={() => send('SKIP_FORWARD')}
      />
    </div>
  )
}

export default Player
