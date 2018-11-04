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
			console.log('Sat initial <Editor> value. Should focus?')
			this.codeMirror.setValue(this.props.value)
		}
		this.codeMirror.on('change', () => this.handleChange())
		// Set the cursor at the end of existing content
		// this.codeMirror.focus()
		// this.codeMirror.setCursor(this.codeMirror.lineCount(), 0)
	}

	componentDidUpdate(prevProps) {
		const value = this.props.value
		// console.log('<Editor> didupdate', value, prevProps.value)
		if (value !== prevProps.value) {
			console.log(`overwriting code mirror value from`, prevProps.value, 'to', value)
			this.codeMirror.setValue(value)
		}
	}

	handleChange() {
		const value = this.codeMirror.getValue()
		console.log('<Editor> handleChange', value)
		this.props.onChange(value)
	}

	render() {
		return <div ref={this.myRef} />
	}
}
