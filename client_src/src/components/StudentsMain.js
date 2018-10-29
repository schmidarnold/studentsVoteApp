import React, {Component} from 'react';
import { Menu, Segment,Button, Icon,Modal, Header,Form } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import {saveNewClass} from '../actions/classesActions'
import ClassMain from './ClassMain'
import NewStudent from './NewStudent'
import {connect} from 'react-redux'

class StudentsMain extends Component{

    state ={
      activeItem: '',
      classId:0,
      showNewClassDialog: false,
      showNewStudentDialog: false,
      open: false,
      name: '',
    }


 newStudentClick = () =>{
   this.setState({
     showNewStudentDialog : true,
     open: true
   })

 }
 newStudentClose = () => {
   this.setState({
     showNewStudentDialog : false
   })
 }

  newClassClick = () => {
    console.log("New Class Button clicked")
    this.setState({
      showNewClassDialog: true,
      open: true
    })
  }
  newClassCancel = () => {
      this.setState({
        showNewClassDialog: false
      })
  }
  newClassSave = () => {

      if (this.state.name.length>0){
        console.log("Saving Class!!!")
        const newClass={
          name: this.state.name
        }
        this.props.createNewClass(newClass)
      }
      this.setState({
        showNewClassDialog: false
      })

  }

  handleItemClick = (e, data) => {
    this.setState({
    activeItem: data.name,
    classId: data.index
    })

  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  render(){
    const classes = this.props.classes
    const { activeItem,classId,open } = this.state
    const ButtonNewStudent = ( <div><Button circular icon='plus' color='green' floated='right' onClick={this.newStudentClick}/></div> )
    let classOverview;
    if(activeItem.length > 0){
      classOverview = <ClassMain
        className={activeItem}
        classId={classId}/>
    }else{
      classOverview = "Bitte Klasse auswählen"
    }
    return (
      <div>
        <Menu attached='top' tabular>
          {
            classes.map((curClass)=>(
              <Menu.Item key={curClass.id} index={curClass.id} name={curClass.name} active={activeItem === curClass.name} onClick={this.handleItemClick} />
            )

            )
          }

          <Menu.Menu position='right'>
            <Menu.Item>
              <Button circular color='blue' onClick={this.newClassClick}>
                <Icon name='plus' />
                Klasse
              </Button>
              <Button circular>
                <Icon name='settings' onClick={()=>{this.props.history.push('/settings')}} />
              </Button>


            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          {activeItem.length >0 && ButtonNewStudent}

          {classOverview}

          {this.state.showNewClassDialog &&
            <Modal  open={open} basic size='small'>
              <Header icon='plus' content='Neue Klasse anlegen' />
              <Modal.Content>
                  <Form>
                    <Form.Input placeholder='Klassenbezeichnung' name='name' value={this.state.name} onChange={this.handleChange} />
                  </Form>

              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red' inverted onClick={this.newClassCancel}>
                    <Icon name='remove' /> Abbrechen
                  </Button>
                  <Button color='green' inverted onClick={this.newClassSave}>
                    <Icon name='checkmark' /> Erstellen
                  </Button>
                </Modal.Actions>
              </Modal>
          }

        </Segment>
        {this.state.showNewStudentDialog &&
          <Modal open={open} >
            <NewStudent
              classId = {this.state.classId}
              className = {this.state.activeItem}
              onClose = {this.newStudentClose}
              edit = {false}
              />
          </Modal>
        }
      </div>
    )
  }
}
function mapStateToProps({classes}){
  return {
    classes
  };
}
function mapDispatchToProps (dispatch) {
  return {
    createNewClass: (newItem)=> dispatch(saveNewClass(newItem)),


  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps) (StudentsMain));
