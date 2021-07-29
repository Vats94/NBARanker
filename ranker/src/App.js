import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// We use Route in order to define the different routes of our application

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Vote from "./components/vote";

import background from "./nba.jpg";



const App = () => {
  document.body.style.backgroundColor = 'rgb(' + 248  + ',' + 248 + ',' + 248 + ')';
  document.body.style.background = background;

  return (
    <div>
      
    <Router> 
      <div className= "container">
      <Navbar />
      <br/>
        <Route path ="/" exact component = {Vote} />
        <Route path ="/rankings" exact component = {RecordList} />
      </div>
    </Router>
    </div>
  );
};

export default App;


