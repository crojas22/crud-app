import config from './config'
import axios from 'axios'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './src/js/App'

const getApiUrl = id => {
  return id ? `${config>serverUrl}/api/post/${id}` : `${config.serverUrl}/api/post`
}

const serverRender = () =>
  axios.get
