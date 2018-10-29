import React, { Component } from 'react';
import Form from 'formsy-react';
import { Container, Button, Label, Segment, Divider,Modal } from 'semantic-ui-react';
import { Input,Dropdown } from 'formsy-semantic-ui-react';
import {connect} from 'react-redux'
import {saveNewStudent} from '../actions/studentActions'
const styles = {
  root: {
    marginTop: 18,
    // padding: '0 24px 24px 24px',
  },

  customErrorLabel: {
    color: '#f00',
    textAlign: 'center',
  },
};

const options=[]
class NewStudent extends Component {
  state = { formData: null }

  onValidSubmit = (formData) => {
    const newStudent = {
      'name' : formData.name,
      'classId' : this.props.classId
    }
    this.props.createNewStudent(newStudent)
    this.props.onClose()
  //  console.log (newStudent)
  };   // eslint-disable-line
  componentDidMount(){
    this.props.classes.forEach((curClass)=> {options.push(
    {'text' : curClass.name,
      'value' : curClass.id
    }
    ) })

  }

  render() {
    const errorLabel = <Label color="red" pointing="left"/>;
    const {edit,classId,className,onClose} = this.props


    // Shows errros with the <Label/> component
    const inputWithLabel = (
      <Input
        name="name"
        placeholder="Namen des/der Schülers/in"

        label="Name"
        required

        validationErrors={{

          isDefaultRequiredValue: 'Name muss eingegeben werden',
        }}
        errorLabel={ errorLabel }
        style={ styles.formElement }
      />
    );

    const dropdownSingle = (
      <Dropdown
        name="classId"
        placeholder="Klasse auswählen"

        search
        selection
        required
        validationErrors={{
          isDefaultRequiredValue: 'Eine Klasse muss ausgewählt werden',
        }}
        errorLabel={ errorLabel }
        options={ options }
      />
    );




    return (
      <Modal.Content>
      <Container style={ styles.root }>
        <Form
          noValidate
          onValidSubmit={ this.onValidSubmit }
          ref={ref => this.form = ref }
        >
          <Segment>
            <h5> Eingabe Schüler - Klasse {className} </h5>
            { inputWithLabel }
            { edit && dropdownSingle }
          </Segment>



          <Divider/>

          <Button
            content="OK"
            style={ styles.formElement }
            color="green"
          />
          <Button
            type="button"
            onClick={onClose}
            content="Zurück"
            color="black"
          />
        </Form>
      </Container>
    </Modal.Content>
    );
  }
}
function mapStateToProps({classes}){
  return {
    classes
  };
}
function mapDispatchToProps (dispatch) {
  return {
    createNewStudent: (newItem)=> dispatch(saveNewStudent(newItem)),


  }
}
export default connect(mapStateToProps,mapDispatchToProps) (NewStudent);
