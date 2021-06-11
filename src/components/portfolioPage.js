import React from 'react'
import {Link} from 'react-router-dom'
import { Tween } from 'react-gsap'
import Column from './Column'
import ScrollBar from './ScrollBar'
import Portfolio from './Portfolio'
 
const portfolioPage = props => {
	return (
		<div className="content_wrapper">
			<ScrollBar>
				<Column>
					<div className="page portfolio_page">

						<Tween
			      		from={{ css: { y:'-100%', opacity:0 }}}
		    				duration={1.5}>
							<header style={{margin:'0 0 24px'}}>
								<Link to="/" style={{color:'#FFF'}}><span><i className="fas fa-arrow-left"></i></span> Back To Home</Link>
							</header>
						</Tween>
						
						<Portfolio renderFilter={true} renderViewPortfolio={false} />
					</div>
				</Column>
			</ScrollBar>
		</div>
	)
}

export default portfolioPage