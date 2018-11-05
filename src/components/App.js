import React from 'react'
import {Router} from '@reach/router'
import Home from './Home'
// import Note from './Note'
// import List from './List'
// import LinkToLatestNote from './LinkToLatestNote'
// <LinkToLatestNote />
// import RemoteStorageWidget from './RemoteStorageWidget'
// <RemoteStorageWidget />
// <Note path="/:id" />
// <List path="/open" />

let App = () => (
	<Router>
		<Home path="/*" />
	</Router>
)

export default App
