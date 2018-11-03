import React, {useState, useEffect} from 'react'
import {Link} from '@reach/router'
import store, {findAll} from '../store'

function ListItem(props) {
	return (
		<li>
			<Link to={'/' + props.item.id}>{props.item.content}</Link>
		</li>
	)
}

export default function List() {
	const [notes, setNotes] = useState([])

	useEffect(() => {
		findAll()
			.then(notes => setNotes(notes))
			.catch(err => {
				console.log(err)
			})
	}, [])

	function deleteAll() {
		store.local.reset()
		setNotes([])
	}

	return (
		<div>
			<p>
				We have {notes.length} notes.
				<button onClick={deleteAll}>Delete all</button>
			</p>
			<ul>
				{notes.map((note, index) => (
					<ListItem item={note} key={index} />
				))}
			</ul>
		</div>
	)
}
