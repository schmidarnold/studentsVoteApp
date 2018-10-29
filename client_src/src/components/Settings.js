import React, {Component} from 'react';
import { Segment, Input, Button, Grid,Icon,List,Form,Menu,Message } from 'semantic-ui-react'
import {loadCriteria,deleteCriteria,saveNewCriteria} from '../actions/settingsActions'
import {addNewStudentArray} from '../actions/studentActions'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import CSVReader from "react-csv-reader";
import "./styles_csvimport.css";

class Settings extends Component{
  state = {

    name: '',
    showImport: false,
    importArray:''
   }

  componentDidMount(){

    this.props.loadCriteriaFromStore()
  }
  removeCriteria = (curCriteria)=>{
    console.log(`Removing criteria ${curCriteria.name}`)
    this.props.deleteCriteriaFromStore(curCriteria)
  }
  addCriteria = ()=>{
    console.log(this.state)
    this.props.addCriteriaToStore(this.state)
    this.setState({name:''})
  }
  goToHome = ()=>{
    this.props.history.push('/')
    console.log("go home")
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleImport = (data) => {
    let classHashMap = this.props.classes.reduce((map,obj)=> (map[obj.name] = obj.id,map),{})

    var jsonStudentArray = []
    data.forEach((element)=>{
      let classNumber = classHashMap[element[0]]
      if (classNumber == null) {
        console.log ("Fehler " + element)
      } else {
        var obj = {
          classId: classHashMap[element[0]],
          name: element[1]
        }
        jsonStudentArray.push(obj)
      }


    })
    this.setState({
      showImport:true,
      importArray: jsonStudentArray
    })

    //console.log(jsonStudentArray)
    //console.log(classHashMap["2A"])
  }
  importData = () =>
    {
      console.log(JSON.stringify(this.state.importArray))
      let response = this.props.importStudents(this.state.importArray)
      this.setState({
        showImport:false
      })
    }

  render(){
    const {criteria} = this.props
    return(
      <div>

          <Menu>
            <h1>Einstellungen</h1>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button circular color='blue' onClick={()=>this.goToHome()} >
                  <Icon name='home' />
                  Home
                </Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>

        <Segment>
        Kriterien
        <Grid columns={3}>
          <Grid.Row>

            <Grid.Column width={6}>
              <Form>
              <Input placeholder='Neues Kriterium' name='name' value={this.state.name} onChange={this.handleChange}/>
              </Form>
            </Grid.Column>
            <Grid.Column width={2}>
            <Button onClick={this.addCriteria}>
              <Icon name='arrow right' />
            </Button>
            </Grid.Column>
            <Grid.Column width={6}>
            <List selection verticalAlign='middle'>
              {criteria.map((curCriteria)=>(
                <List.Item key={curCriteria.id}>
                  <Icon name='trash' onClick={() => this.removeCriteria(curCriteria)}/>
                  <List.Content>
                    <List.Header>{curCriteria.name}</List.Header>

                  </List.Content>

                </List.Item>
              ))
              }

            </List>
            </Grid.Column>
          </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          Import Schüler
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div className="container">
                  <CSVReader
                    cssClass="react-csv-input"
                    label="Bitte csv-Datei der Schüler auswählen"
                    onFileLoaded={this.handleImport}
                    />
                    {this.state.showImport && (
                      <div>
                      <Message
                        header='Import Schülderdaten'
                        content= {`Möchten Sie ${this.state.importArray.length} Schüler importieren`}
                        />
                      <Button primary onClick={()=>this.importData()}>Import starten</Button>
                      </div>
                      )
                    }
                </div>
              </Grid.Column>
            </Grid.Row>

          </Grid>
        </Segment>
      </div>
    )
  }
}
function mapStateToProps({criteria,classes}){
  return {
    criteria,
    classes
  };
}
function mapDispatchToProps (dispatch) {
  return {
    loadCriteriaFromStore: () => dispatch(loadCriteria()),
    deleteCriteriaFromStore: (curCriteria) => dispatch(deleteCriteria(curCriteria)),
    addCriteriaToStore: (criteria) => dispatch(saveNewCriteria(criteria)),
    importStudents: (students) => dispatch(addNewStudentArray(students))
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Settings);
