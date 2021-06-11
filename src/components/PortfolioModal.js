import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import ScrollBar from './ScrollBar'
import Portfolio from './Portfolio'
import Backdrop from './Backdrop'

class PortfolioModal extends Component {
	componentDidMount(){
		this.page.classList.add('show')
	}
	componentWillUnmount(){
		this.page.classList.remove('show')
	}
	handleBackdropClicked = () => {
		console.log('fefewfe')
	}
	render(){
		return(
			<React.Fragment>
				<Link to="/"><Backdrop /></Link>
				{/* <Link to="/" className="back_to_home"><span><i className="fas fa-arrow-right"></i></span></Link> */}
				<ScrollBar>
					<div className="page portfolio_modal" ref={page => this.page = page}>
						<Portfolio 
							renderFilter={true} 
							renderViewPortfolio={false} />
					</div>
				</ScrollBar>
			</React.Fragment>
		)
	}
}

export default PortfolioModal