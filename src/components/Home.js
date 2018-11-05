import React, {useState, useEffect} from 'react'
import {navigate} from '@reach/router'
import SearchOrCreate from './SearchOrCreate'
import Note from './Note'
import List from './List'
import store, {findAll, findNote, saveNote} from '../store'

export default function Home(props) {
	let [notes, setNotes] = useState([])
	let [query, setQuery] = useState('')
	let [filteredList, setFilteredList] = useState()
	let [activeNote, setActiveNote] = useState({})

	const {'*': noteId} = props

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
		setQuery(query)
		setActiveNote(null)
	}

	async function handleSubmit() {
		let firstResult = filteredList[0]

		// If we have a result when you submit, switch to it.
		if (firstResult) {
			navigate(`/${firstResult.id}`)
			return
			// @todo set focus on last line of <Editor>
		}

		// Else, create new note and set the query as "title"
		try {
			let note = await saveNote(query)
			setActiveNote(note)
			navigate(`/${note.id}`)
		} catch (err) {
			alert('could not save')
		}
	}

	async function updateContent(content) {
		let note = await saveNote(activeNote.title, content, activeNote.id)
		// Not setting active note because it messes up the <Editor> value/cursor.
		// setActiveNote(note)
	}

	function onEscape() {
		console.log('clearing')
		setQuery('')
		setActiveNote(null)
		navigate('/')
	}

	return (
		<div>
			<SearchOrCreate
				value={query}
				onChange={handleChange}
				onSubmit={handleSubmit}
				onEscape={onEscape}
			/>
			<List notes={notes} filter={query} onFilter={setFilteredList} />
			<Note note={activeNote} onChange={updateContent} />

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
