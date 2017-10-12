'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NoteSchema = new Schema({
	text: String,
  updating: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	votes: {type: Number, default:0}
})

const NotepadSchema = new Schema({
	text: String,
  updating: {type: Boolean, default: false},
	createdAt: {type: Date, default: Date.now},
	answers: [NoteSchema]
})

const Notepad = mongoose.model('Notepad', NotepadSchema)

export default Notepad
