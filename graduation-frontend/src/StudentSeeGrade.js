/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Container,Grid, Menu,Icon,Header,Table,Label,Button,Statistic, Divider,Form,ButtonGroup} from "semantic-ui-react";
import './App.css';
import { withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class LectureDahsboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
        lectures: {},
        studentLec:[],
        currentPage:0,
        studentNum:"",
        isLoaded: true,
    };
  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="student"){
      toast.warning("You tried to access a page without authorization.");
      this.props.history.push("/");
    }
    
    this.getStLecture();

    
      
  };


  getStLecture=()=> {
    fetch("http://localhost:8083/api/student/lectures",
    {
        method : "GET",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include",
    })

    .then((r) =>{
      if(r.ok){
        return r;
      }
      if(r.status===401 || r.status === 403 || r.status===500){
        return Promise.reject(new Error("An error occured"));
      }
    })
    .then((r) =>{
        return r.json();
    })
    .then((data) => {
    //  toast.info(`Totaly ${data.totalElements} page found`);
      this.setState({studentLec:data})
    })
    .catch((e) => {
      toast.error(e.message);
    });



};


  



  handleChange= (e) =>{
    const {currentTarget} = e;
    const {value , name} = currentTarget;
    this.setState({ [name]: value});
  };

  logout = () => {
    fetch("http://localhost:8083/logout",
          {
          method : "POST",
          headers:{
              "Content-Type":"application/json",
          },
          credentials:"include",
      })
  
      .then((r) =>{
          if(r.ok){
          return r;
          }
          if(r.status===401 || r.status === 403 || r.status===500){
            return Promise.reject(new Error("An error occured"));
          }
      })
      .then((r) =>{
        toast.success("Succesfuly logout.You are redirected to the login page");
        setTimeout(()=> {
          localStorage.setItem("permission","null");
          this.props.history.push("/");
        },2000);
      })
      .catch((e) => {
          toast.error(e.message);
      });
  }




  render = () =>{
    
    const {  studentLec} = this.state;
    
    return (
      <div className="App">

<div class="ui left fixed vertical menu">
        <div class="item">
            <h1>Menu</h1>
            </div>

            <a class="item" onClick={()=>{ 
               localStorage.setItem("permission","student");
              this.props.history.push("/student-announcement"); 
              }}>Announcement </a>
              <div></div>

              <a class="item"onClick={()=>{
                 localStorage.setItem("permission","student"); 
              this.props.history.push("/student-lecture"); 
              }}>Chose Lecture</a>
               <h3 class="ui header">Lecture Grade</h3>
               <a class="item" onClick={() => {
                  localStorage.setItem("permission","student");
                      this.props.history.push("/student-update-info"); 
                    }} >Update Info</a>

            <a class="item" onClick={() => {
                        this.logout();
                      }} >Log Out</a>
          </div>
        <Container>
                
          <Grid>
          
           

            <Grid.Row columns="equal" centered>
              <Grid.Column width={15}>
              <Header size="huge">Student Lecture</Header>

                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Lecture Code</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Name</Table.HeaderCell>
                        <Table.HeaderCell> Credit</Table.HeaderCell>
                        <Table.HeaderCell> Akts</Table.HeaderCell>
                        <Table.HeaderCell> Midterm 1</Table.HeaderCell>
                        <Table.HeaderCell> Midterm 2</Table.HeaderCell>
                        <Table.HeaderCell> Final</Table.HeaderCell>
                        <Table.HeaderCell>Letter Grade</Table.HeaderCell>
                        
                        
                        
                        
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {studentLec &&
                        studentLec.map((value,index)=>(
                            <Table.Row> 
                            <Table.Cell>
                              <Label ribbon>
                                {index+1}
                              </Label>
                            </Table.Cell>
                            <Table.Cell>{value.lecture.code}</Table.Cell>
                            <Table.Cell>{value.lecture.name}</Table.Cell>
                            <Table.Cell>{value.lecture.credit}</Table.Cell>
                            <Table.Cell>{value.lecture.akts}</Table.Cell>
                            <Table.Cell>{value.midterm1}</Table.Cell>
                            <Table.Cell>{value.midterm2}</Table.Cell>
                            <Table.Cell>{value.finalGrade}</Table.Cell>
                            <Table.Cell>{value.letterGrade}</Table.Cell>
                            
                            

                        </Table.Row>
                        ))}

                    
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='11'>

                       
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
               
                
               
                  
                <br/>
                
              
                      
                


              </Grid.Column>
              <Grid.Column  centered relaxed='very' stackable>
            

                
              </Grid.Column>
            </Grid.Row>

            

          </Grid>
        </Container>
        
        
      </div>
    );
  };
}




export default withRouter(LectureDahsboard);
