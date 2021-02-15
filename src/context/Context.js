import { createContext, useContext } from 'react'
import { useMachine } from "@xstate/react"
import playerMachine from '../machine/playerMachine'


const PlayerContext = createContext()

export const usePlayerContext = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }) => {
  const [current, send] = useMachine(playerMachine)
  const {elapsed, duration, songs, currentSongIndex} = current.context

  return (
    <PlayerContext.Provider value={{
        elapsed, duration,
        songs, currentSongIndex,
        send, matches: current.matches
    }}>
      { children }
    </PlayerContext.Provider>
  )
}
