import React, { Component, Fragment } from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import 'styles/main.scss';

// stores
import ModalStore from 'store/modal';

// components
import ModalWrapper from 'components/common/modal/modal-wrapper';

// routes
import Home from 'routes/home';
import Fin from 'routes/fin';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
@observer
export default class App extends Component {
	render(){
		return (
			<Router>
				<Provider
					modalStore={ModalStore}
					// other stores...
				>
					<Fragment>
						<div>
							{/*<nav>
								<Link to="/">Home</Link>
								<Link to="/comp-one">Component 1</Link>
							</nav>*/}


							{/* can place routes here */}
							<Switch>
								<Route exact path="/" component={Home}/>
								<Route path="/fin" component={Fin}/>
								{/* other routes */}
							</Switch>
						</div>

						{/* other stuff - ie: modal, growls, etc */}
						<ModalWrapper/>
					</Fragment>
				</Provider>
			</Router>
		)
	}
}
