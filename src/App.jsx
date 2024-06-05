import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import PizzaProductSection from './Pages/PizzaProductSection';
import Success from './Pages/Success';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/PizzaMenu" component={PizzaProductSection} />
        <Route path="/success" component={Success} />
      </Switch>
    </Router>
  );
}

export default App;
