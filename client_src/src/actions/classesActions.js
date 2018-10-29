import * as types from './actionTypes';
import {getClasses,addClassAPI} from '../utils/StudentsAPI'

export function loadClassesSuccess(classes){
  return{
    type: types.LOAD_CLASSES_SUCCESS,
    classes
  };
}

export function addClass(newClass){
  console.log(newClass)
  return{
    type: types.ADD_CLASS,
    newClass
  };
}

export function loadClasses(){
  return function(dispatch){
    return getClasses().then(
      classes =>{
        dispatch(loadClassesSuccess(classes))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function saveNewClass(newClass){
  return function(dispatch){
    return addClassAPI(newClass).then(
      newClass =>{

        dispatch(addClass(newClass))
      }).catch(error=>{
        throw(error);
      });

  };
}
