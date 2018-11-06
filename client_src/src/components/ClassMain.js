import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card } from 'semantic-ui-react'
import StudentCard from './StudentCard'

class ClassMain extends Component {

    render(){
      //props from parent component
      const {className, classId} = this.props
      //props from redux
      const {students} = this.props
      // filtering students of class
      const studentsArray =  Object.values(students).filter(student => student.classId === classId)

      return(
        <div>
          <h1>Schülerübersicht der Klasse {className}</h1>

          <Card.Group>
            {studentsArray.map((student)=>
              ( //child component
                <StudentCard
                  curStudent={student}
                  key={student.id}
                  curClass={className}
                  />
              )
            )}
          </Card.Group>

        </div>
      )
    }
}
function mapStateToProps({students}){
  //console.log(students)
  return {

    students
  };
}
function mapDispatchToProps (dispatch) {
  return {



  }
}

export default connect(mapStateToProps,mapDispatchToProps) (ClassMain);
