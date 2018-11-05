import React from 'react'
import {Link} from '@reach/router'

export default () => (
	<nav>
		<Link to="/">New note</Link> | <Link to="open">Open</Link>
	</nav>
)
