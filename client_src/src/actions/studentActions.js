import * as types from './actionTypes';
import {getStudents, addStudentAPI, deleteStudentAPI,addStudentArrayAPI} from '../utils/StudentsAPI'

export function loadStudentsSuccess(students){
  return{
    type: types.LOAD_STUDENTS_SUCCESS,
    students
  };
}
export function addStudent(newStudent){
  console.log(newStudent)
  return{
    type: types.ADD_STUDENT,
    newStudent
  };
}
export function deleteStudent(student){
  return {
    type: types.DELETE_STUDENT,
    student
  }
}
export function addStudentArray(students){
  return {
    type: types.ADD_STUDENT_ARRAY,
    students
  }
}
export function loadStudents(){
  return function(dispatch){
    return getStudents().then(
      students =>{
        dispatch(loadStudentsSuccess(students))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function saveNewStudent(newStudent){
  return function(dispatch){
    return addStudentAPI(newStudent).then(
      newStudent =>{

        dispatch(addStudent(newStudent))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function addNewStudentArray(newStudents){
  return function(dispatch){

    return addStudentArrayAPI(newStudents).then(
      newStudents =>{

        dispatch(addStudentArray(newStudents))
      }).catch(error=>{
        throw(error);
      });

  };
}
export function removeStudent(student){
  const studentToDelete = student
  return function(dispatch){
    return deleteStudentAPI(student).then(
      () =>{
        dispatch(deleteStudent(studentToDelete))
      }).catch(error =>{
        throw(error);
      });

  };
}
