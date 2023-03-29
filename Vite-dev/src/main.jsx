import React from 'react'
// You no longer need to "import React from 'react' " on every page/componant (only do it in main.jsx), .jsx does it for you

import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

