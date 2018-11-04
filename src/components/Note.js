import React from 'react'
import Editor from './Editor'

export default function Note({note, onChange}) {
	// async function handleChange(content) {
	// 	let note = await saveNote(activeNote.title, content, activeNote.id)
	// 	console.log({ note })
	// 	setActiveNote(note)
	// }
	if (!note) {
		return ''
	}

	return (
		<div>
			id: {note.id}
			<br />
			title: {note.title}
			<br />
			<Editor value={note.content} onChange={onChange} />
		</div>
	)
}
