import React, {useState, useEffect} from 'react'
import {navigate} from '@reach/router'
import SearchOrCreate from './SearchOrCreate'
import Note from './Note'
import List from './List'
import store, {findAll, findNote, saveNote} from '../store'

export default function Home(props) {
	let [notes, setNotes] = useState([])
	let [query, setQuery] = useState()
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
				console.log('loadNote', noteId)
				let note = await findNote(noteId)
				console.log({note})
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
		// navigate('/')
	}

	async function handleSubmit() {
		let firstResult = filteredList[0]
		console.log({submit: query, firstResult, filteredList})
		// if search result, load it and set cursor at end
		// else create new note with query as "title"
		if (firstResult) {
			console.log('todo focus editor with', {firstResult})
			// navigate(`/${firstResult.id}`)
		} else {
			console.log('no note found. create new?', query)
			try {
				let note = await saveNote(query)
				setActiveNote(note)
				navigate(`/${note.id}`)
			} catch (err) {
				alert('could not save')
			}
		}
	}

	async function updateContent(content) {
		let note = await saveNote(activeNote.title, content, activeNote.id)
		console.log({note})
		// setActiveNote(note)
	}

	// useEffect(() => {
	// 	console.log('query effect', query)
	// }, [query])
	// ESC: focus search

	return (
		<div>
			<SearchOrCreate onChange={handleChange} onSubmit={handleSubmit} />
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
