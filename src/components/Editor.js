import React, {Component} from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

export default class Editor extends Component {
	constructor(props) {
		super(props)
		this.myRef = React.createRef()
	}

	componentDidMount() {
		this.cm = CodeMirror(this.myRef.current)
		if (this.props.value) {
			this.cm.setValue(this.props.value)
			this.setFocus()
		}
		this.cm.on('change', () => this.handleChange())
	}

	componentDidUpdate(prevProps) {
		const value = this.props.value
		if (value !== prevProps.value) {
			this.cm.setValue(value)
		}
		this.setFocus()
	}

	handleChange() {
		const value = this.cm.getValue()
		this.props.onChange(value)
	}

	setFocus() {
		this.cm.focus()
		this.cm.setCursor(this.cm.lineCount(), 0)
	}

	render() {
		return <div ref={this.myRef} />
	}
}
