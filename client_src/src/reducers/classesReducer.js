import * as types from '../actions/actionTypes';

export default function classesReducer(state=[], action){
  switch(action.type){
    case types.LOAD_CLASSES_SUCCESS:
            return action.classes;
    case types.ADD_CLASS:
      {
      const newState = [...state, action.newClass]
      return  newState
      }
    default:
        return state;
  }
}
