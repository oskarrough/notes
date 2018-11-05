export default function StatusLine(props) {
	const {hasNotes, isSearching, isEditing, searchResults, title} = props

	if (!hasNotes)
		return 'WELCOME Search and press <enter> to edit a note. If a search reveals nothing, pressing <enter> will create a note with the appropriate title.'

	if (isEditing) return `EDIT ${title}. Press <escape> to return.`

	if (isSearching)
		return `SEARCH ${
			searchResults && searchResults.length
				? 'Found ' + searchResults.length + ' notes. Press <enter> to select.'
				: `Press <enter> to create a new note`
		}`

	return 'READY'
}
