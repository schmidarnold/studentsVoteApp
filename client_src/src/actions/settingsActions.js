import * as types from './actionTypes';
import {getCriteriaAPI, deleteCriteriaAPI, addCriteriaAPI} from '../utils/StudentsAPI'

export function loadCriteriaSuccess(criterias){
  return{
    type: types.LOAD_CRITERIA_SUCCESS,
    criterias
  };
}
export function removeCriteria(criteria){
  return {
    type: types.REMOVE_CRITERIA,
    criteria
  }
}
export function addCriteria(criteria){
  return{
    type: types.ADD_CRITERIA,
    criteria
  }
}
export function loadCriteria(){

  return function(dispatch){
    return getCriteriaAPI().then(
      criterias =>{

        dispatch(loadCriteriaSuccess(criterias))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function deleteCriteria(criteria){
  const criteriaToDelete = criteria
  return function(dispatch){
    return deleteCriteriaAPI(criteria).then(
      () =>{
        dispatch(removeCriteria(criteriaToDelete))
      }).catch(error =>{
        throw(error);
      });

  };
}
export function saveNewCriteria(newCriteria){
  return function(dispatch){
    return addCriteriaAPI(newCriteria).then(
      newCriteria =>{

        dispatch(addCriteria(newCriteria))
      }).catch(error=>{
        throw(error);
      });

  };
}
