import React from 'react';
import {Switch, Route} from 'react-router-dom';
import StudentsMain from './StudentsMain';
import Settings from './Settings'
import About from './About';
import Assessment from './Assessment'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={StudentsMain}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/settings' component={Settings}/>
      <Route exact path='/assessment/:id' component={Assessment}/>
    </Switch>
  </main>
)
export default Main;
