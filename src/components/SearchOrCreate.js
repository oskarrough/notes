import React from 'react'

export default function SearchOrCreate(props) {
	function handleChange(event) {
		// console.log('change', event.target.value)
		if (props.onChange) props.onChange(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
		// console.log('submit', event.target.value)
		if (props.onSubmit) props.onSubmit()
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input autoFocus placeholder="Search or create" onInput={handleChange} />
			</label>
			<input type="submit" value="Submit" />
		</form>
	)
}
