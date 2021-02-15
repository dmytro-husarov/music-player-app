import { FaMusic } from "react-icons/fa"
import classes from './Nav.module.scss'
import { usePlayerContext } from "../../context/Context"


const Nav = () => {
  const { matches, send } = usePlayerContext()
  
  return (
    <nav className={classes.Nav}>
      <h1>Waves</h1>
      <button onClick={() => {
        matches('library.closed') && send('OPEN')
        matches('library.opened') && send('CLOSE')
      }}>
        Library
        <FaMusic />
      </button>
    </nav>
  )
}

export default Nav
