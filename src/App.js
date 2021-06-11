import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import RouteSwitcher from './components/RouteSwitcher'

const App = () => (
  <React.Fragment>
    <div className="overlay_layer"></div>
    <Router>
    	<Route component={RouteSwitcher} />
    </Router>
  </React.Fragment>
)

export default App