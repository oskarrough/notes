import React from 'react'
import {Router, Link} from '@reach/router'
import Note from './Note'
import List from './List'
import LinkToLatestNote from './LinkToLatestNote'
import RemoteStorageWidget from './RemoteStorageWidget'

let App = () => (
	<div>
		<nav>
			<Link to="/">New note</Link> | <Link to="open">Open</Link>
		</nav>
		<Router>
			<Home path="/" />
			<Note path="/:id" />
			<List path="/open" />
		</Router>
		<RemoteStorageWidget />
	</div>
)

let Home = () => (
	<div>
		<Note />
		<LinkToLatestNote />
	</div>
)

export default App
