import React, {useRef, useEffect} from 'react'

export default function SearchOrCreate(props) {
	let inputEl = useRef(null)

	function handleChange(event) {
		if (props.onChange) props.onChange(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
		if (props.onSubmit) props.onSubmit()
	}

	useEffect(() => {
		inputEl.current.focus()
	}, [props.value])

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input
					value={props.value}
					ref={inputEl}
					autoFocus
					placeholder="Search or create"
					onChange={handleChange}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	)
}
