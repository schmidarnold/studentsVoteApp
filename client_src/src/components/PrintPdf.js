import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'

import jsPDF from 'jspdf';
import 'jspdf-autotable';


class PrintPdf extends Component{
  createPdf=(studentName,voteArray,average1, average2) => {
    let arraySem1 = voteArray.filter((el)=> el.semester===1)
    let arraySem2 = voteArray.filter((el)=> el.semester===2)
    var columns = [
	     { title: "Bewertungsdatum", dataKey: "A" },
	      { title: "Note", dataKey: "B" },
	       { title: "Kriterium", dataKey: "C" }
    ];

    var linesSem1 = []
    var linesSem2 = []
    var rows = arraySem1.map((curVote) => {
      let line = {"A": curVote.date, "B": curVote.vote, "C": curVote.criteria}
      linesSem1 = [...linesSem1,line]
    })
    var rows = arraySem2.map((curVote) => {
      let line = {"A": curVote.date, "B": curVote.vote, "C": curVote.criteria}
      linesSem2 = [...linesSem2,line]
    })
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    doc.text("Mitarbeitsnoten Schüler/in: " + studentName, 10, 20);

    if (arraySem1.length > 0) {

      doc.autoTable(columns, linesSem1, {
        startY: doc.autoTableEndPosY() + 70,
        margin: { horizontal: 10 },
        styles: { overflow: 'linebreak' },
        bodyStyles: { valign: 'top' },
        columnStyles: { email: { columnWidth: 'wrap' } },
        theme: "striped"
      });
      doc.setFontSize(10)
      doc.text("Durchschnitt Semester 1: " + average1 ,10,doc.autoTableEndPosY() + 30);
    }
    

    if (arraySem2.length >0) {
      doc.autoTable(columns, linesSem2, {
        startY: doc.autoTableEndPosY() + 70,
        margin: { horizontal: 10 },
        styles: { overflow: 'linebreak' },
        bodyStyles: { valign: 'top' },
        columnStyles: { email: { columnWidth: 'wrap' } },
        theme: "striped"
      });
      doc.setFontSize(10)
      doc.text("Durchschnitt Semester 2: " + average2 ,10,doc.autoTableEndPosY() + 30);
    }


    doc.save(studentName+".pdf");
  }


  render(){
    const {voteArray,studentName,average1,average2} = this.props
    return(
      <Button primary onClick={()=>this.createPdf(studentName,voteArray,average1, average2)}>PDF Export</Button>
    )
  }
}
function mapStateToProps({criteria,classes,students,votes}){
  return {
    criteria,
    classes,
    students,
    votes
  };
}
function mapDispatchToProps (dispatch) {
  return {

  }
}
export default PrintPdf;
