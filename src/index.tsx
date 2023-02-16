import './index.css'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from './store'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HashRouter basename="/#">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)
