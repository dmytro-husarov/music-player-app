import { createMachine, assign } from "xstate"
import chillHop from "../data"


const playerMachine = createMachine({
  id: 'player',
  context: {
    songs: chillHop(),
    currentSongIndex: 0,
    audio: null,
    duration: 0,
    elapsed: 0,
  },
  type: 'parallel',
  states: {
    player: {
      initial: 'paused',
      states: {
        paused: {
          on: {
            PLAY: {
              target: 'playing',
              actions: ['playSong'],
            },
          },
        },
        playing: {
          entry: (context, _event) => {
            context.audio.autoplay = true
          },
          on: {
            PAUSE: {
              target: 'paused',
              actions: ['pauseSong'],
            },
          },
          exit: (context, _event) => {
            context.audio.autoplay = false
          },
        },
      },
      on: {
        LOADED: {
          actions: assign({
            audio: (_context, event) => event.audio,
            duration: (_context, event) => event.audio.duration,
          }),
        },
        TIMING: {
          actions: assign({
            elapsed: (context, _event) => context.audio.currentTime,
          }),
        },
        DRAGGING: {
          actions: assign({
            elapsed: (context, event) => {
              context.audio.currentTime = event.value
              return event.value
            },
          }),
        },
        SKIP_BACK: {
          actions: ['skipBackSong'],
        },
        SKIP_FORWARD: {
          actions: ['skipForwardSong'],
        },
      },
    },
    library: {
      initial: 'closed',
      states: {
        closed: {
          on: {
            OPEN: {
              target: 'opened',
            },
          },
        },
        opened: {
          on: {
            CLOSE: {
              target: 'closed',
            },
            SELECT_SONG: {
              actions: ['selectSong'],
            },
          },
        },
      },
    },
  },
},
{
  actions: {
    playSong: (context, _event) => {
      context.audio.play()
    },
    pauseSong: (context, _event) => {
      context.audio.pause()
    },
    skipBackSong: assign({
      currentSongIndex: ({songs, currentSongIndex}, _event) => {
        if (((currentSongIndex - 1) % songs.length) === -1) {
          return (songs.length - 1)
        }
        return ((currentSongIndex - 1) % songs.length)
      },
    }),
    skipForwardSong: assign({
      currentSongIndex: (context, _event) => {
        return ((context.currentSongIndex + 1) % context.songs.length)
      },
    }),
    selectSong: assign({
      currentSongIndex: (_context, event) => {
        return event.index
      },
    }),
  },
})

export default playerMachine
