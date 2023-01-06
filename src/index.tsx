import './index.css'

import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)
