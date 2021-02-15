import classes from './App.module.scss'
import Nav from './components/Nav/Nav'
import Song from './components/Song/Song'
import Player from './components/Player/Player'
import Library from './components/Library/Library'
import { usePlayerContext } from './context/Context'


function App() {
  const { matches } = usePlayerContext()
  const clsLibraryActive = matches('library.opened') ? classes.LibraryActive : ''

  return (
    <div className={[classes.App, clsLibraryActive].join(' ')}>
      <Nav />
      <Song />
      <Player />
      <Library />
    </div>
  )
}

export default App
