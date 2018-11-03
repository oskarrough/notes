import React, {useState, useEffect} from 'react'
import {Link} from '@reach/router'
import {findAll} from '../store'

// Returns a link to the newest note.
export default function LinkToLatestNote() {
	const [latest, setLatest] = useState()
	useEffect(async () => {
		const notes = await findAll()
		if (!notes.length) return
		let note = notes[notes.length - 1]
		setLatest(note)
	}, [])
	if (latest && latest.content) {
		return (
			<p>
				Continue where you left off? <Link to={'/' + latest.id}>{latest.content}</Link>
			</p>
		)
	} else {
		return ''
	}
}
