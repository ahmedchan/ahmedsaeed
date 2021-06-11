import React, { Component } from 'react'
import { Tween } from 'react-gsap'
import PersonalDetails from './PersonalDetails'
import Accordion from './Accordion'
import About from './About'
import Portfolio from './Portfolio'
import ScrollBar from './ScrollBar'
import Column from './Column'
import Skills from './Skills'
import Education from './Education'
import Employment from "./Employment"

class Home extends Component {
   constructor(props){
      super(props)
      this.state = {
        editable: false,
        breakpoint: 768,
        isWideScreen: true
      }
   }

   componentWillMount(){
      this.isMobile()

      if (this.props.location.pathname === '/backend') {
         this.setState({ editable: !this.state.editable });
      } 
   }

   isMobile(){
      if(  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        this.setState({isWideScreen: false});
      }else{
        this.setState({isWideScreen:true});
      }
   }

   render() {
    const { isWideScreen } = this.state

      return (
       
        <div className="content_wrapper">

          <Column classes="personal_details">
            <PersonalDetails />
          </Column>

          <ScrollBar>
            <Column>
              <div className="panel_group">
               <Tween
                from={{ css: {y:'80%', opacity:0, scale:0}}}
                duration={.7}>
                  <div>
                    <Accordion allowMultipleOpen>
                      <div label="About Me" isOpen={isWideScreen}>
                        <About />
                      </div>

                      <div label="education" isOpen={isWideScreen}>
                        <Education />
                      </div>

                      <div label="skills" isOpen={isWideScreen}>
                        <Skills />
                      </div>

                      <div label="employment history" isOpen={isWideScreen}>
                        <Employment />
                      </div>
                    </Accordion>
                  </div>
                </Tween>
              </div>
            </Column>
          </ScrollBar>

          <ScrollBar>
            <Column>
              <Portfolio
                isEditable={this.state.editable}
                renderFilter={false}
                renderViewPortfolio={true}
              />
            </Column>
          </ScrollBar>

        </div>

      )
   }
}

export default Home
