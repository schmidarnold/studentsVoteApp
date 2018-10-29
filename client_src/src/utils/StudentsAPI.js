import axios from 'axios';

async function getClasses() {
  let response = await  axios.get('http://localhost:3000/api/Classes');
  return response.data;
}

async function getStudents() {
  let response = await axios.get('http://localhost:3000/api/Students');
  return response.data;
}
async function getVotes() {
  console.log('calling getVotes api')
  let response = await axios.get('http://localhost:3000/api/Y');
  return response.data;
}
async function getVotesByStudentsId(studentsId) {
  console.log('getVotesByStudentsId')
  let response = await axios.get(`http://localhost:3000/api/Students/${studentsId}/votes`);
  return response.data;
}
async function addClassAPI(newClass){
  let response = await axios.put('http://localhost:3000/api/Classes',newClass);
  return response.data;
}
async function addStudentAPI(newStudent){
  let response = await axios.put('http://localhost:3000/api/Students',newStudent);
  return response.data;
}
async function addStudentArrayAPI(newStudents){
  console.log ("addStudentArrayAPI: " + newStudents)
  let response = await axios.post('http://localhost:3000/api/Students',newStudents);
  return response.data;
}
async function addCriteriaAPI(newCriteria){
  let response = await axios.put('http://localhost:3000/api/Criteria',newCriteria);
  return response.data;
}
async function deleteStudentAPI(student){
  let response = await axios.delete(`http://localhost:3000/api/Students/${student.id}`);
  return response.data;
}
async function deleteCriteriaAPI(criteria){
  let response = await axios.delete(`http://localhost:3000/api/Criteria/${criteria.id}`);
  return response.data;
}
async function deleteVoteAPI(vote){
  let response = await axios.delete(`http://localhost:3000/api/Y/${vote.id}`);
  return response.data;
}
async function getCriteriaAPI(){

  let response = await  axios.get('http://localhost:3000/api/Criteria');
  return response.data;
}
async function addVoteAPI(newVote){
  let response = await axios.put('http://localhost:3000/api/Y',newVote);
  return response.data;
}
async function updateVoteAPI(vote){
  let response = await axios.patch(`http://localhost:3000/api/Y/${vote.id}`,vote);
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
