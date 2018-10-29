import * as types from '../actions/actionTypes';

export default function assessmentReducer(state=[], action){
  switch(action.type){
    case types.LOAD_ASSESSMENT_SUCCESS:
      console.log('assessmentReducer, LOAD_ASSESSMENT_SUCCESS')
      return action.votes.reduce( (acc, cur) =>{
        acc[cur.id] = cur;
        return acc;
      },{} );
    case types.LOAD_ASSESSMENT_STUDENTID:
      console.log('assessmentReducer, LOAD_ASSESSMENT_STUDENTID')
        return action.votes.reduce( (acc, cur) =>{
          acc[cur.id] = cur;
          return acc;
        },{} );
    case types.ADD_ASSESSMENT:
          return {
            ...state,
            [action.vote.id]:action.vote
            }
    case types.DELETE_VOTE:
          {
          delete state[action.vote.id]
          return{
            ...state
            }
          }
    case types.UPDATE_ASSESSMENT:
        state[action.vote.id] = {
          ...state[action.vote.id],
          ...action.vote
        }
        return {
          ...state
        }
      default:
        return state;
  }
}
