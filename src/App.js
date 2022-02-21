import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Empleado from './pages/Empleado';
import Addempleado from './pages/Addempleado';
import Editempleado from './pages/Editempleado';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Empleado} />
          <Route  path="/add-empleado" component={Addempleado} />
          <Route path="/edit-empleado/:id" component={Editempleado} />
        </Switch>
    </Router>
  );
}

export default App;
