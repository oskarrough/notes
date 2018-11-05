import React from 'react'

export default function SearchOrCreate(props) {
	function handleChange(event) {
		if (props.onChange) props.onChange(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
		if (props.onSubmit) props.onSubmit()
	}

	// When you press "ESCAPE", focus the search input and reset query.
	function handleKeyPress(event) {
		if (event.key === 'Escape' && props.onEscape) props.onEscape()
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input
					value={props.value}
					autoFocus
					placeholder="Search or create"
					onChange={handleChange}
					onKeyUp={handleKeyPress}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	)
}
