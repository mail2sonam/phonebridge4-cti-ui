import React from "react";
import {Route, Router, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import Agent from "./SamplePage/Agent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
     
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}agent`} component={asyncComponent(() => import('./SamplePage/Agent'))}/>
      <Route path={`${match.url}monitor`} component={asyncComponent(() => import('./SamplePage/Monitor'))}/>
    </Switch>
  </div>
);


// function App(){

//   return(
//   <Router>
//     <Route path="/agent" component={Agent}/>
    
//   </Router>
//   );
// }

export default App;
