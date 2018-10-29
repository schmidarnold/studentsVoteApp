import * as types from './actionTypes';
import {getVotes,getVotesByStudentsId,addVoteAPI,deleteVoteAPI,updateVoteAPI} from '../utils/StudentsAPI'

export function loadAssessmentsSuccess(votes){
  return{
    type: types.LOAD_ASSESSMENT_SUCCESS,
    votes
  };
}
export function loadAssessmentsByStudentId(votes){
  return{
    type: types.LOAD_ASSESSMENT_STUDENTID,
    votes
  }
}

export function addAssessment(vote){
  return{
    type: types.ADD_ASSESSMENT,
    vote
  }
}
export function deleteVote(vote){
  return{
    type: types.DELETE_VOTE,
    vote
  }
}
export function editAssessment(vote){
  return{
    type: types.UPDATE_ASSESSMENT,
    vote
  }
}
export function saveNewVote(newVote){
  return function(dispatch){
    return addVoteAPI(newVote).then(
      newVote =>{

        dispatch(addAssessment(newVote))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function loadVotes(){
  return function(dispatch){
    return getVotes().then(
      votes =>{
        dispatch(loadAssessmentsSuccess(votes))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function loadVotesByStudentsId(id){
  return function(dispatch){
    return getVotesByStudentsId(id).then(
      votes =>{
        dispatch(loadAssessmentsByStudentId(votes))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function removeVote(vote){
  const voteToDelete = vote
  return function(dispatch){
    return deleteVoteAPI(vote).then(
      () =>{
        dispatch(deleteVote(voteToDelete))
      }).catch(error =>{
        throw(error);
      });

  };
}

export function editVote(vote){
  const voteToEdit = vote
  return function(dispatch){
    return updateVoteAPI(vote).then(
      () => {
        dispatch(editAssessment(voteToEdit))
      }).catch(error => {
        throw(error);
      })
    }
}
