import React, {useState, useEffect} from 'react'
import {navigate} from '@reach/router'
import Editor from './Editor'
import {findNote, saveNote} from '../store'

export default function Note(props) {
	const [note, setNote] = useState({id: '', content: ''})

	useEffect(
		async () => {
			if (!props.id) return
			let note = await findNote(props.id)
			if (!note) return navigate('/')
			setNote(note)
		},
		[props.id]
	)

	async function handleChange(content) {
		let newNote = await saveNote(content, note.id)
		if (!note.id && newNote.id) {
			setNote({id: newNote.id})
		}
	}

	return <Editor value={note.content} onChange={handleChange} />
}
