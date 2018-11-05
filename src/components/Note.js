import React from 'react'
import Editor from './Editor'

export default function Note({note, onChange}) {
	console.log(note)
	if (!note || !note.title) return ''

	// todo, title should also be editable.

	return (
		<div>
			<p>
				<strong>{note.title}</strong> <small>({note.id})</small>
			</p>
			<Editor value={note.content} onChange={onChange} />
		</div>
	)
}
