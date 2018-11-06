import axios from 'axios';

async function getClasses() {
  let response = await axios.get(process.env.REACT_APP_API_URL + "/api/Classes")
  //let response = await  axios.get('http://localhost:3000/api/Classes');
  return response.data;
}

async function getStudents() {
  let response = await axios.get(process.env.REACT_APP_API_URL +'/api/Students');
  return response.data;
}
async function getVotes() {
  console.log('calling getVotes api')
  let response = await axios.get(process.env.REACT_APP_API_URL +'/api/Y');
  return response.data;
}
async function getVotesByStudentsId(studentsId) {
  console.log('getVotesByStudentsId')
  let response = await axios.get(process.env.REACT_APP_API_URL +`/api/Students/${studentsId}/votes`);
  return response.data;
}
async function addClassAPI(newClass){
  let response = await axios.put(process.env.REACT_APP_API_URL +'/api/Classes',newClass);
  return response.data;
}
async function addStudentAPI(newStudent){
  let response = await axios.put(process.env.REACT_APP_API_URL +'/api/Students',newStudent);
  return response.data;
}
async function addStudentArrayAPI(newStudents){
  console.log ("addStudentArrayAPI: " + newStudents)
  let response = await axios.post(process.env.REACT_APP_API_URL +'/api/Students',newStudents);
  return response.data;
}
async function addCriteriaAPI(newCriteria){
  let response = await axios.put(process.env.REACT_APP_API_URL +'/api/Criteria',newCriteria);
  return response.data;
}
async function deleteStudentAPI(student){
  let response = await axios.delete(process.env.REACT_APP_API_URL +`/api/Students/${student.id}`);
  return response.data;
}
async function deleteCriteriaAPI(criteria){
  let response = await axios.delete(process.env.REACT_APP_API_URL +`/api/Criteria/${criteria.id}`);
  return response.data;
}
async function deleteVoteAPI(vote){
  let response = await axios.delete(process.env.REACT_APP_API_URL +`/api/Y/${vote.id}`);
  return response.data;
}
async function getCriteriaAPI(){

  let response = await  axios.get(process.env.REACT_APP_API_URL +'/api/Criteria');
  return response.data;
}
async function addVoteAPI(newVote){
  let response = await axios.put(process.env.REACT_APP_API_URL +'/api/Y',newVote);
  return response.data;
}
async function updateVoteAPI(vote){
  let response = await axios.patch(process.env.REACT_APP_API_URL +`/api/Y/${vote.id}`,vote);
  return response.data;
}
export {
  getClasses,
  getStudents,
  getCriteriaAPI,
  addClassAPI,
  addStudentAPI,
  addStudentArrayAPI,
  addVoteAPI,
  deleteStudentAPI,
  deleteCriteriaAPI,
  deleteVoteAPI,
  addCriteriaAPI,
  getVotes,
  getVotesByStudentsId,
  updateVoteAPI
  };
