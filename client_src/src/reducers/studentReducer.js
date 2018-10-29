import * as types from '../actions/actionTypes';

export default function studentReducer(state=[], action){
  switch(action.type){
    case types.LOAD_STUDENTS_SUCCESS:
      //console.log('studentReducer, Load_Students_Success')
      return action.students.reduce( (acc, cur) =>{
        acc[cur.id] = cur;
        return acc;
      },{} );
    case types.ADD_STUDENT:
      return {
        ...state,
        [action.newStudent.id]:action.newStudent
        }
    case types.DELETE_STUDENT:
        {
          console.log ("Deleting student with id: " + action.student.id)
          delete state[action.student.id]
          return{
            ...state
          }
        }
    case types.ADD_STUDENT_ARRAY:
        //console.log ("Reducer, adding students: " + JSON.stringify(action.students))
        console.log ("Reducer, current state: " + JSON.stringify(state))
        const studMap =  action.students.reduce((acc, p) => ({...acc, [p.id]: p}),{})
        console.log("Reducer, mapped students: " + JSON.stringify(studMap))
        return {
          ...state,
          ...studMap

        }
    default:
        return state;
  }
}
