import React from 'react'
import ProgressBar from './ProgressBar'

const Skills = props => {
   return (
      <React.Fragment>
         <p>
            Writing up clean , maintainable and organized code that match W3C validating code quality, web accessibility and best practice, Managing friendly responsive websites that working on mobile, tablets and web through @media queries, Ability for solving problems and browsers compatibility.
         </p>
         <div className="skills">
            <ProgressBar value={95} title={['html', 'html5']} />
            <ProgressBar value={95} title={['css', 'css3']} />
            <ProgressBar value={90} title="javascript" />
            <ProgressBar value={77} title="sass" />
            <ProgressBar value={84} title="jQuery" />
            <ProgressBar value={80} title="React" />
            <ProgressBar value={70} title="Angular" />
            <ProgressBar value={70} title="Vue" />
            <ProgressBar value={80} title="Axios" />
            <ProgressBar value={30} title="php" />
            <ProgressBar value={80} title="ajax" />
            <ProgressBar value={90} title="json" />
            <ProgressBar value={30} title="node" />
            <ProgressBar value={75} title="photoshop" />
            <ProgressBar value={50} title="illustrator" />
            <ProgressBar value={80} title="web design" />
            <ProgressBar value={78} title="gulp" />
            <ProgressBar value={65} title="webpack" />
            <ProgressBar value={90} title="source control" />
            <ProgressBar value={80} title="sublime editor" />
            <ProgressBar value={80} title="VS Code editor" />
         </div>
      </React.Fragment>
   )
}

export default Skills