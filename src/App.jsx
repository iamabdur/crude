import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Component/Login.jsx';
import UserForm from './Component/UserForm.jsx';  
function App() {
  

  return ( 
    
    <>
    <Router>
      <Switch>
        <Route path="/signup" component={UserForm} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
    </>
    
  )
}

export default App
