import React, {useState, useEffect} from 'react'
import {navigate} from '@reach/router'
import SearchOrCreate from './SearchOrCreate'
import Note from './Note'
import List from './List'
import store, {findAll, findNote, saveNote} from '../store'

export default function Home(props) {
	let {'*': noteId} = props
	let [notes, setNotes] = useState([])
	let [query, setQuery] = useState('')
	let [filteredList, setFilteredList] = useState()
	let [activeNote, setActiveNote] = useState()

	useEffect(
		function loadNotes() {
			findAll()
				.then(notes => setNotes(notes))
				.catch(err => {
					console.log(err)
				})
		},
		[activeNote]
	)

	function deleteNotes() {
		store.local.reset()
		setNotes([])
	}

	useEffect(
		async function loadNote() {
			if (noteId) {
				let note = await findNote(noteId)
				if (!note) {
					console.log('no note with this id, going back to home')
					navigate('/')
				}
				setActiveNote(note)
			}
		},
		[noteId]
	)

	function handleChange(query) {
		setActiveNote(null) // stop editing
		setQuery(query)
	}

	async function handleSubmit() {
		let firstResult = filteredList[0]

		// If we have a result when you submit, switch to it.
		if (firstResult) {
			navigate(`/${firstResult.id}`)
			return
		}

		// Else, create new note, set the query as "title" and switch to it.
		try {
			let note = await saveNote(query)
			setActiveNote(note)
			navigate(`/${note.id}`)
		} catch (err) {
			throw new Error('could not save note', err)
		}
	}

	async function handleContentChange(content) {
		await saveNote(activeNote.title, content, activeNote.id)
		// Not setting active note because it messes up the <Editor> value/cursor.
		// setActiveNote(note)
	}

	function onEscape() {
		setQuery('')
		setActiveNote(null)
		navigate('/')
	}

	// When you press "ESCAPE", focus the search input and reset query.
	function handleKeyPress(event) {
		if (event.key === 'Escape') onEscape()
	}

	return (
		<div className="Home" onKeyDown={handleKeyPress} tabIndex="-1">
			<SearchOrCreate value={query} onChange={handleChange} onSubmit={handleSubmit} />
			<List notes={notes} filter={query} onFilter={setFilteredList} />
			<Note note={activeNote} onChange={handleContentChange} />

			{notes.length ? (
				<p>
					<button onClick={deleteNotes}>Delete all notes</button>
				</p>
			) : (
				''
			)}
		</div>
	)
}
