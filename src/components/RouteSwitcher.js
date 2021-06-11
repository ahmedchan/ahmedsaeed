import React, {Component} from 'react'
import { Route, Switch } from "react-router-dom"
import { Tween } from 'react-gsap'
import Home from './Home'
import PortfolioModal from './PortfolioModal'
import portfolioPage from './portfolioPage'
import Copyright from './Copyright'
import ContactInfo from './ContactInfo'

class RouteSwitcher extends Component {

	previousLocation = this.props.location

	componentWillUpdate(nextProps){
		let { location } = this.props;
		if (
			nextProps.history.action !== "POP" &&
			(!location.state || !location.state.modal)
		) {
			this.previousLocation = this.props.location;
		}
	}

	render(){

		let { location } = this.props;

		let isModal = !!(
			location.state &&
			location.state.modal &&
			this.previousLocation !== location
		) // not initial render

		return(
			<div className="app">
				<main className="content">
		        <Switch location={isModal ? this.previousLocation : location}>
	          		<Route exact path="/" component={Home} />
	          		<Route path="/backend" component={Home} />
	          		{!isModal && <Route path="/portfolio" component={portfolioPage} /> }
		        </Switch>
        		</main>
        		{isModal ? <Route path="/Portfolio" component={PortfolioModal} /> : null}

        		<Tween
	      	from={{ css: {opacity: 0}}}
    			duration={1.6}>
					<footer className="footer">
						<div className="wrapper">
							<ContactInfo />
							<Copyright />
						</div>
					</footer>
				</Tween>
	      </div>
		)
	}
}

export default RouteSwitcher