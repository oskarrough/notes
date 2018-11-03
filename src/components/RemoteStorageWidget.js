import React, {Component} from 'react'
import Widget from 'remotestorage-widget'
import remoteStorage from '../store'

export default class RemoteStorageWidget extends Component {
	componentDidMount() {
		const widget = new Widget(remoteStorage)
		widget.attach('RemoteStorageWidget')
	}
	render() {
		return <div id="RemoteStorageWidget" />
	}
}
