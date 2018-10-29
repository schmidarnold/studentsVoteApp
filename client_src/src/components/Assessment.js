import React, {Component} from 'react';
import { Button, Icon, Table, Label,Segment, Confirm } from 'semantic-ui-react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment';
import VoteForm from './VoteForm';
import PrintPdf from './PrintPdf'
import {saveNewVote,removeVote,editVote} from '../actions/assessmentActions'

class Assessment extends Component{
  state = { formData: null,
            formVisible: false,
            editVote: false,
            open:false,
            curVote:null,
          }
  componentDidMount(){

  }
  averageVote = (voteArray,semester) => {
    const array = voteArray.filter (el => el.semester === semester)
    if (array.length === 0) {
      return "Keine Note"
    }
    const sum = array.reduce((a, b) => +a + +b.vote, 0);
    console.log (array)
    const voteAverage = sum / array.length;
    return voteAverage
    //return (Math.round(voteAverage*100)/100).toFixed(3)
  }
  showNewVoteForm=() =>{

    this.setState({
      editVote: false,
      formVisible:true
    })
  }
  onFormCancel=()=>{
    this.setState({
      formVisible:false
    })
  }
  showEditVoteForm=(curVote) =>{
    this.setState({
      editVote: true,
      formVisible:true,
      curVote:curVote
    })
  }
  onSaveVoteForm = (data) => {
    console.log( 'onSaveVoteForm, data: ' + JSON.stringify(data))
    const voteToSave = {...data,
      'studentId': parseInt(this.props.match.params.id,10) }
    if (this.state.editVote === false) {
        this.props.addNewVote(voteToSave)
      } else{
        //editing vote
        console.log ('onSaveVoteForm: ' + JSON.stringify(voteToSave))
        this.props.editVote(voteToSave)
      }

    //console.log( newVote)
    this.setState(
      {
        formVisible:false
      }
    )
  }
  showConfirmDelWindow = (vote) => {

    console.log (vote.id)
    this.setState({ open: true
    })
  }

  //  console.log (newStudent)
  closeConfirmDelWindow = () => this.setState({ open: false })
  confirmDelWindow = (vote) => {
    this.props.delVote(vote)
    this.setState({open:false})
  }
  render(){

    const studentId = parseInt(this.props.match.params.id, 10)
    const {votes,students} = this.props

  //  const studentsVoteArray = Object.values(votes).filter(vote => vote.studentId === studentId)
    const studentsVoteArray = Object.values(votes).filter(vote => vote.studentId === studentId)
    var contentText = `Möchten Sie diese Note wirklich löschen`
    return(
      <div>

        {this.state.formVisible &&
          <Segment>

            <VoteForm
              studentsId = {studentId}
              editVote={this.state.editVote}
              onSave={this.onSaveVoteForm}
              onCancel={this.onFormCancel}
              curVote={this.state.curVote}
              />

          </Segment>
        }
        <h3> Bewertungsübersicht  </h3>
        <h4>{(students[studentId]).name}</h4>
        <Table celled padded>
          <Table.Header>
              <Table.Row>


                <Table.HeaderCell>Bewertungsdatum</Table.HeaderCell>
                <Table.HeaderCell>Note</Table.HeaderCell>
                <Table.HeaderCell>Kriterium</Table.HeaderCell>
                <Table.HeaderCell>
                  <PrintPdf
                  voteArray = {studentsVoteArray}
                  studentName = {(students[studentId]).name}
                  average1 = {this.averageVote(studentsVoteArray,1)}
                  average2 = {this.averageVote(studentsVoteArray,2)}
                  />
              </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {
              studentsVoteArray.map((curVote)=>(
                <Table.Row key={curVote.id}>

                  <Table.Cell>

                    <Moment format="DD/MM/YYYY" date={curVote.date} />
                  {//  <Moment format="DD/MM/YYYY">
                      //{curVote.date.slice(0,-5)}
                  //    {curVote.date.toString()}
                  // </Moment>
                  }

                  </Table.Cell>
                  <Table.Cell>{curVote.vote}</Table.Cell>
                  <Table.Cell>{curVote.criteria}</Table.Cell>
                  <Table.Cell><Button icon='trash' color='red' onClick={()=>this.showConfirmDelWindow(curVote)} /></Table.Cell>
                  <Table.Cell><Button icon='edit' color='blue' onClick={()=>this.showEditVoteForm(curVote)}/></Table.Cell>
                  <Confirm content={contentText} open={this.state.open} onCancel={this.closeConfirmDelWindow} onConfirm={()=>this.confirmDelWindow(curVote)} />
                </Table.Row>
              ))
            }



            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='3'>
                  <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.showNewVoteForm}>
                    <Icon name='book'  /> Bewertung hinzufügen
                  </Button>
                  <Label>
                    Semester1
                    <Label.Detail>{this.averageVote(studentsVoteArray,1)}</Label.Detail>
                  </Label>
                  <Label>
                    Semester2
                    <Label.Detail>{this.averageVote(studentsVoteArray,2)}</Label.Detail>
                  </Label>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
        </Table>

      </div>
    )
  }
}
function mapStateToProps({votes,students}){

  return {
    votes,
    students
  };
}
function mapDispatchToProps (dispatch) {
  return {
    addNewVote: (newItem)=> dispatch(saveNewVote(newItem)),
    delVote: (vote)=> dispatch(removeVote(vote)),
    editVote: (vote)=> dispatch(editVote(vote))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Assessment);
