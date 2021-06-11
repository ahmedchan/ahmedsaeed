import React from 'react'
import { Tween } from 'react-gsap'
import Avatar from './Avatar'
import Socials from './Socials'
import personalAvatar from '../img/personal_avatar.jpg'

const PersonalDetails = props => {
	return(
	   <React.Fragment>
	      <div className="avatar_container">
	      	<Tween
	      		from={{ css: { rotation: '-360deg', x:-360, opacity:0, scale:.4 }}}
	      		ease="Back.easeOut"
    				duration={1.7}>
	         	<div><Avatar img={personalAvatar} /></div>
	         </Tween>
	         <Socials />
	      </div>
	      <Tween
	      	from={{ css: { y: 220, opacity:0, scale:0 }}}
	      	ease="Back.easeOut"
    			duration={1}>
	      	<h1 className="title">Ahmed Saeed</h1>
      	</Tween>
      	<Tween
	      	from={{ css: { y: 340, opacity:0, scale:0}}}
	      	ease="Back.easeOut"
    			duration={2}>
	      	<h3 className="position">Senior UI, Front-End Developer</h3>
	      </Tween>
	   </React.Fragment>
	)
}

export default PersonalDetails