# Modal component

## Options

#### `center` - bool
Centers the modal verticaly.

#### `maxWidth` - number
Max width of the modal, currently only used if `center` is set to `true`

#### `fullScreen` - bool
If modal content would overflow viewport, by default you would scroll up and down the page to view modal content. Enabling `fullScreen` caps the modal to the viewport height requiring you to scroll within the modal view. 

If height of modal is going to change, need to call `updateHeight` on props.

#### `constrainedHeight` - bool
I forgot what the difference between this and `fullScreen` is.

#### `sidebar` - bool
Opens modal as sidebar emerging from right.


#### `anim` - string
Type of animation to use. Options are:
```
'scale-fade-in' 	// default
'fade-in'
```


## Props passed to component view

```
YourComponent.propTypes = {
	// modal controls
	updateHeight: PropTypes.func.isRequired,
	showContent: PropTypes.func.isRequired,
	close: PropTypes.func.isRequired,

	// any other data passed
	// ...
}
```