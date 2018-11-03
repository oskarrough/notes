import React, {Component} from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

export default class Editor extends Component {
	constructor(props) {
		super(props)
		this.myRef = React.createRef()
	}

	componentDidMount() {
		this.editor = CodeMirror(this.myRef.current, {
			value: this.props.value
		})
		this.editor.on('change', () => this.handleChange())
	}

	componentDidUpdate(prevProps) {
		const value = this.props.value || ''
		if (value !== prevProps.value) {
			this.editor.setValue(value)
		}
	}

	handleChange() {
		const value = this.editor.getValue()
		this.props.onChange(value)
	}

	render() {
		return <div ref={this.myRef} />
	}
}
