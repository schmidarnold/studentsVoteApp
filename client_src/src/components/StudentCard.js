import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card, Button, Icon, Confirm } from 'semantic-ui-react'
import {removeStudent} from '../actions/studentActions'
import { Link } from 'react-router-dom';
class StudentCard extends Component {
  state = { open: false }

 open = () => this.setState({ open: true })
 close = () => this.setState({ open: false })
 confirm = () => {
   this.props.deleteStudent(this.props.curStudent)
   this.setState({open:false})
 }
    render(){
      const {curStudent, curClass} = this.props
      const contentText = `Sind Sie sicher, dass Sie den Schüler ${curStudent.name} löschen möchten? `
      return(
        <div>
          <Card>

            <Card.Content>
              <Button color='red' inverted floated='right' onClick={this.open}>
                <Icon name='trash' />
              </Button>
              <Card.Header>{curStudent.name}</Card.Header>
              <Card.Meta>{"Klasse: " + curClass }</Card.Meta>
              <Card.Meta><Link to ={`/assessment/${curStudent.id}`}> Bewertungen </Link></Card.Meta>
            </Card.Content>
          </Card>
          <Confirm content={contentText} open={this.state.open} onCancel={this.close} onConfirm={this.confirm} />
        </div>
      )
    }
}
function mapStateToProps ({students}){
  return {
    students
  };
}
function mapDispatchToProps (dispatch) {
  return {
    deleteStudent: (student)=> dispatch(removeStudent(student)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (StudentCard);
