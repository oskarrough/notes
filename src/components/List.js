import React, {useState, useEffect} from 'react'
import {Link} from '@reach/router'
import score from '../stringScore'

const ListItem = ({item}) => (
	<li>
		<Link to={'/' + item.id}>
			{item.title} — <small>{item.content}</small>
			<span style={{color: 'red'}}>
				{' '}
				{item.titleScore}/{item.contentScore}
			</span>
		</Link>
	</li>
)

export default function List({notes, filter, onFilter}) {
	const [filteredNotes, setFilteredNotes] = useState([])

	useEffect(
		function doSearch() {
			let fuzzy = false
			let results = notes
				.map(note => {
					note.titleScore = score(note.title, filter, fuzzy)
					note.contentScore = score(note.content, filter, fuzzy)
					return note
				})
				.filter(note => {
					return note.titleScore + note.contentScore > 0
				})
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
			results = results.sort(
				(a, b) => a.titleScore + a.contentScore - (b.titleScore + b.contentScore)
			)
			// results = results.orderBy('contentScore')
			setFilteredNotes(results)
			if (onFilter) onFilter(results)
		},
		[filter]
	)

	let list = filter ? filteredNotes : notes

	return (
		<div>
			{list.length ? (
				<div>
					<ul>
						{list.map((note, index) => (
							<ListItem item={note} key={index} />
						))}
					</ul>
					{filter ? (
						<p>
							Filtering for <em>{filter}</em>. Showing {list.length} of {notes.length} notes.
						</p>
					) : (
						''
					)}
				</div>
			) : (
				<p>No notes.</p>
			)}
		</div>
	)
}
