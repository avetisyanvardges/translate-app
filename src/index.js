import React from 'react'
import ReactDOM from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import App from './App'
import history from './utils/browserHistory'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
)
reportWebVitals()
