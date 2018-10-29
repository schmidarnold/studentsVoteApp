import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initStore from "./store/index";
import {Provider} from 'react-redux'
import {loadClasses} from './actions/classesActions'
import {loadStudents} from './actions/studentActions'
import {saveState} from "./store/localStorage";
import {loadVotes} from './actions/assessmentActions'
import 'semantic-ui-css/semantic.min.css';
const store = initStore()
store.subscribe(()=>{
  saveState(store.getState())
})
store.dispatch(loadClasses());
store.dispatch(loadStudents());
store.dispatch(loadVotes());

ReactDOM.render(
<BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
</BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();
