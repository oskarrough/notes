import React from 'react'
import Editor from './Editor'

export default function Note({note, onChange}) {
	if (!note || !note.title) return ''
	// todo, title should also be editable.
	return <Editor value={note.content} onChange={onChange} />
}
