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
	<div>
		<Router>
			<Home path="/*" />
		</Router>
	</div>
)

export default App
