# Lazy Loading

Wrap routes or components with lazy loader to load them asynchronously and separately from the main `bundle.js`.

## Setup

### 1. Create your component
Create your component like normal:

```jsx
// src/components/foo.jsx
import React, { Component } from 'react'

export default class Foo extends Component {
	render(){
		return (
			<div>This is foo</div>
		)
	}
}
```

### 2. Create a lazy loader for your component

```jsx
// src/components/lazy-foo.jsx
import React, { Component } from 'react'
import LazyLoader from 'components/lazy-loader'

// create a load function that resolves to your component file
function loadFn(){
	return import(
		/* webpackChunkName: "CHUNK_NAME" */
		/* webpackMode: "lazy" */
		'src/components/foo.jsx' // path to your component
	)
}

// export the bundle
export default class SomeBundle extends LazyLoader {
	// do one of the following based on whether you want to pre-fetch
	static preload = false; // if you dont need it to preload (lazy load only)
	static preload = loadFn(); 	// if you want to start loading component immediately on app load

	constructor(props){
		super(props, loadFn())
	}
}
```

### 3. Use your component
```jsx
import LazyFoo from 'src/components/lazy-foo'

// use as normal react component
<LazyFoo someProp="val" />
```
