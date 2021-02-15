import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { PlayerProvider } from './context/Context'


ReactDOM.render(
  <PlayerProvider>
    <App />
  </PlayerProvider>,
  document.getElementById('root')
)
