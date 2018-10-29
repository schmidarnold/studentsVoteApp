import React, {Component} from 'react';
import Form from 'formsy-react';
import { addValidationRule } from 'formsy-react';
import { Input,Dropdown} from 'formsy-semantic-ui-react';
import DatePicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {Container,Divider, Button, Label,Checkbox} from 'semantic-ui-react';
import {connect} from 'react-redux'
const styles = {
  root: {
    marginTop: 9,
    // padding: '0 24px 24px 24px',
  },

  customErrorLabel: {
    color: '#f00',
    textAlign: 'center',
  },
  radioGroup: {
    display: 'flex',
    marginBottom: 18,
  },

  radio: {
    marginLeft: 4,
    marginRight: 12,
  },
};
const dropDownValues = []
addValidationRule('isValidVote', function (values, value) {
  return (value >= 4 && value <=10);
});


class VoteForm extends Component{
  state = {
    formStartDate:moment(),
    value:'1', //for radioGroup, default semester1,
    vote:'',
    criteria:'',
    voteId:'',
  }
  handleDateChange = (date)=> {
    this.setState({
      formStartDate : date

    })
  }
  onValidSubmit = (formData) => {
    //console.log(formData)
    let curAssessment = {
      'criteria': formData.criteria,
      'vote':parseFloat(formData.vote),
      'date': moment.utc(this.state.formStartDate).format(),
      'semester': parseInt(this.state.value,10)
    }
    if (this.props.editVote===true){
      curAssessment = {...curAssessment, 'id' : this.props.curVote.id}
    }
      this.props.onSave(curAssessment)

    //console.log('current state: ' + moment.utc(this.state.formStartDate).format())

  };
  onFormCancel = () => {
    this.props.onCancel()
  }
  handleChange = (e, { value }) => this.setState({ value })  // eslint-disable-line
  //for voteInputVoteLabel
  handleFormsyChange = (e) => {
    let change = { [e.target.name] : e.target.value }
    this.setState(change)
    //console.log(change)
  }
  componentDidMount(){
    console.log('componentDidMount from VoteForm')
    this.props.criteria.forEach((curCriteria)=> {dropDownValues.push(
    {'text' : curCriteria.name,
      'value' : curCriteria.name
    }
    ) })
    if (this.props.editVote===true){

      this.setState({
        formStartDate:moment(this.props.curVote.date),
        value:this.props.curVote.semester.toString(),
        vote:this.props.curVote.vote,
        criteria:this.props.curVote.criteria,

      })
      //console.log('componentDidMount, state: ' + JSON.stringify (this.state))
    }
    }
    componentWillUnmount() {
      //clear array
      dropDownValues.length= 0;
     console.log('componenWillUnmount from VoteForm')
    }
  render(){
    const errorLabel = <Label color="red" pointing="left"/>;

      const inputVoteLabel = (
          <Input
            name="vote"
            placeholder="Bewertung eingeben"
            validations="isNumeric,isFloat,isValidVote"
            label="Bewertung"
            required
            onChange={this.handleFormsyChange}
            value={this.state.vote}
            validationErrors={{

              isDefaultRequiredValue: 'Es muss eine Bewertung von 4 bis 10 eingeben werden',
            }}
            errorLabel={ errorLabel }
            style={ styles.formElement }
          />
        );
      const dropdownCriterias = (
          <Dropdown
            name="criteria"
            placeholder="Bitte auswählen"
            value={this.state.criteria}
            search
            selection
            required
            validationErrors={{
              isDefaultRequiredValue: 'Ein Kriterium muss angegeben werden',
            }}
            errorLabel={ errorLabel }
            options={ dropDownValues }
          />
        );


    return(
      <Container style={ styles.root }>

        <Form
          noValidate
          onValidSubmit={ this.onValidSubmit }
          ref={ref => this.form = ref }
        >

            <h5> Eingabe neue Bewertung </h5>
            <DatePicker
                selected={this.state.formStartDate}
                onChange={this.handleDateChange}
              />
            {inputVoteLabel}
            {dropdownCriterias}

              <Checkbox
                radio
                label='Semester 1'
                name='checkboxRadioGroup'
                value="1"
                checked={this.state.value === '1'}
                onChange={this.handleChange}
              />


              <Checkbox
                radio
                label='Semester2'
                name='checkboxRadioGroup'
                value="2"
                checked={this.state.value === '2'}
                onChange={this.handleChange}
              />

        <Divider/>

          <Button
            content="OK"
            style={ styles.formElement }
            color="green"
          />
          <Button
            type="button"
            onClick={this.onFormCancel}
            content="Abbrechen"
            color="black"
          />
        </Form>
      </Container>
    )
  }
}
function mapStateToProps({criteria}){
  return {
    criteria

  };
}
export default connect(mapStateToProps) (VoteForm)
