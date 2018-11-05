import React, {Component} from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

export default class Editor extends Component {
	constructor(props) {
		super(props)
		this.myRef = React.createRef()
	}

	componentDidMount() {
		this.codeMirror = CodeMirror(this.myRef.current)
		if (this.props.value) {
			console.log('Setting initial <Editor> value. Should focus?')
			this.codeMirror.setValue(this.props.value)
			this.setFocus()
		}
		this.codeMirror.on('change', () => this.handleChange())
	}

	componentDidUpdate(prevProps) {
		const value = this.props.value
		if (value !== prevProps.value) {
			console.log(
				`<Editor> did update. Overwriting codemirror value from`,
				prevProps.value, 'to', value
			)
			this.codeMirror.setValue(value)
			this.setFocus()
		}
	}

	handleChange() {
		const value = this.codeMirror.getValue()
		this.props.onChange(value)
	}

	setFocus() {
		this.codeMirror.focus()
		this.codeMirror.setCursor(this.codeMirror.lineCount(), 0)
	}

	render() {
		return <div ref={this.myRef} />
	}
}

// Set the cursor at the end of existing content
// this.codeMirror.focus()
// this.codeMirror.setCursor(this.codeMirror.lineCount(), 0)
