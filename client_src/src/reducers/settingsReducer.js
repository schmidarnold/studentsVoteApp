import * as types from '../actions/actionTypes';

export default function settingsReducer(state=[], action){
  switch(action.type){
    case types.LOAD_CRITERIA_SUCCESS:
            console.log('reducer criteria success')
            return action.criterias;
    case types.REMOVE_CRITERIA:
      console.log('reducer remove criteria')
      return state.filter(({ id }) => id !== action.criteria.id);
    case types.ADD_CRITERIA:
      {
        const newState = [...state, action.criteria]
        return  newState
      }
    default:
        return state;
  }
}
