'use strict'

import express from 'express'
import React from 'react'
import axios from 'axios'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import bodyParser from 'body-parser'
import session from 'express-session'
import logger from 'morgan'
import apiRouter from './api'
import config from './config'
import App from './src/js/App'

export const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.json())
// logger from morgan is to get on console http status
app.use(logger('dev'))
// for session
app.use(session({
  secret: 'myApp',
  resave: true,
  saveUninitialized: false
}))

app.use('/api', apiRouter)

app.get(['/', '/notepad', '/notepad/:id'], (req, res, next) => {
  let context = {}
  const initialMarkup = renderToString(
    <StaticRouter location={req.url} context={context} ><App /></StaticRouter>
  )
  res.render('index', {
    initialMarkup
  })
})

app.listen(config.port, config.host, () => {
  console.info(`Express is listening on port ${config.port}`)
})
