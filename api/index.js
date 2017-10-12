'use  strict'

import express from 'express'
import mongoose from 'mongoose'
import config from '../config'
// notepad schema
import Notepad from './notepadModel'
// users schema
const User = require('./usersModel')


const router = express.Router()
mongoose.connect(config.mongodbUri, { useMongoClient: true })
mongoose.Promise = global.Promise

// to login to website
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, function(error, user) {
    if(error || !user){
      const err = new Error('Wrong email or password.')
      err.status = 401
      return next(err)
    } else {
      req.session.userId = user._id
      res.json({redirect: true})
    }
  })
})

// to register to website
router.post('/register', (req, res, next) => {
  if( req.body.firstName && req.body.lastName && req.body.email &&
    req.body.password && req.body.confirmedPassword) {
      if (req.body.password !== req.body.confirmedPassword) {
        const err = new Error('Passwords do not match')
        err.status = 400
        return next(err)
      }
      const userData = {
        name: req.body.firstName + ' ' + req.body.lastName,
        email: req.body.email,
        password: req.body.password
      }
      User.create(userData, (error, user) => {
        if(error) return next(error)
        res.json({redirect: true})
      })
    } else {
      const err = new Error('All fields required')
      err.status = 400
      return next(err)
    }
})

// get notepad notes
router.get('/notepad', (req, res, next) => {
  Notepad.find({}).sort({createdAt: -1}).exec((err, note) => {
    if(err) return next(err)
    res.json(note)
  })
})

router.post('/notepad', (req, res, next) => {
  const notepad = new Notepad({text: req.body.newName})
  notepad.save((err, quest) => {
    Notepad.find({}).sort({createdAt: -1}).exec((err, note) => {
      res.json(note)
    })
  })
})

router.put('/notepad/:id', (req, res, next) => {
  Notepad.findById(req.params.id, (err, quest) => {
    quest.text = req.body.text || quest.text,
    quest.updating = !quest.updating,
    quest.createdAt = quest.createdAt,
    quest.answers = quest.answers
    quest.save((err, result) => {
      Notepad.find({}).sort({createdAt: -1}).exec((err, result) => {
        res.json(result)
      })
    })
  })
})

router.delete('/notepad/:id', (req, res, next) => {
  Notepad.findByIdAndRemove(req.params.id, (err, quest) => {
    Notepad.find({}).sort({createdAt: -1}).exec((err, result) => {
      res.json(result)
    })
  })
})

router.get('/notepad/:id', (req, res, next) => {
  Notepad.findOne({"_id": req.params.id}, (err, quest) => {
    if(err) return next(err)
    res.json(quest)
  })
})

router.post('/notepad/:id', (req, res, next) => {
  Notepad.findOne({"_id": req.params.id}, (err, quest) => {
    quest.answers.push({text: req.body.text})
    quest.save((err, note) => {
      if(err) return next(err)
      res.json(note)
    })
  })
})

// delete single note
router.delete('/notepad/:id/notes/:note', (req, res, next) => {
	Notepad.update({_id: req.params.id}, {'$pull': {'answers': { _id: req.params.note}}},(err, quest) => {
		Notepad.findOne({_id: req.params.id}, (err, result) => {
			res.json(result)
		})
	})
})

// update single note
router.put('/notepad/:id/notes/:note', (req, res, next) => {
	Notepad.findById(req.params.id, (err, quest) => {
		quest.answers[req.body.index].text = req.body.text || quest.answers[req.body.index].text,
		quest.answers[req.body.index].updating = !quest.answers[req.body.index].updating
		quest.save((err, note) => {
			Notepad.find({}).sort({createdAt: -1}).exec((err, result) => {
				res.json(result)
			})
		})
	})
})

export default router
