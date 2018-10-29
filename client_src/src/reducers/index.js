import {combineReducers} from 'redux';
import classes from './classesReducer'
import students from './studentReducer'
import criteria from './settingsReducer'
import votes from './assessmentReducer'
const rootReducer = combineReducers(
  {
    classes,
    students,
    criteria,
    votes,
  }
)

export default rootReducer;
