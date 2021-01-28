/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Container,Grid, Menu,Icon,Header,Table,Label,Button,Statistic, Divider,Form,ButtonGroup, TableCell} from "semantic-ui-react";
import './App.css';
import { withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class LectureDahsboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
        students:[],
        currentPage:0,
        midterm1:0,
        midterm2:0,
        final:0,
        studentNum:0,
        isLoaded: true,
        tempName:""
    };
  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="lecturer"){
      toast.warning("You tried to access a page without authorization.");
      this.props.history.push("/");
    }
    

    this.getStudents();
    
      
  };
  
  getStudents=()=> {
      fetch("http://localhost:8083/api/lecturer/students", {
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
        this.setState({students:data})
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
    
    const {  students} = this.state;
    
    return (
      <div className="App">

<div class="ui left fixed vertical menu">
            <div class="item">
            <h1>Menu</h1>
            </div>

            
            <a class="item"onClick={() => {
                        localStorage.setItem("permission","lecturer");
                        this.props.history.push("/lecture-confirm");
                      }} > 
                     Lecture Cofirmation</a>
            

                     <a class="item"onClick={() => {
                        localStorage.setItem("permission","lecturer");
                        this.props.history.push("/set-grade");
                      }} > 
                     Set Lecture Grades</a>

                     <h3 >Consulting Student</h3>


            
            <a class="item" onClick={() => {
                        this.logout();
                      }} >Log Out</a>
          </div>


        <Container>
                
          <Grid>
          
           

            <Grid.Row columns="equal" centered>
              <Grid.Column width={15}>
              <Header size="huge">Consulting students </Header>

                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Surname</Table.HeaderCell>
                        <Table.HeaderCell>Number</Table.HeaderCell>
                        <Table.HeaderCell>Class</Table.HeaderCell>
                        <Table.HeaderCell>Grade Average</Table.HeaderCell>
                        <Table.HeaderCell>See Transkript</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Change Choosen Lectures</Table.HeaderCell>

                        
                        
                        
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {students &&
                        students.map((value,index)=>(
                            <Table.Row> 
                            <Table.Cell>
                              <Label ribbon>
                                {index+1}
                              </Label>
                            </Table.Cell>
                            <Table.Cell>{value.name}</Table.Cell>
                            <Table.Cell>{value.surname}</Table.Cell>
                            <Table.Cell>{value.number}</Table.Cell>
                            <Table.Cell>{value.classNum}</Table.Cell>
                            <Table.Cell>{value.gradeAverage}</Table.Cell>
                            <Table.Cell>  
                            
                              <Button icon>
                                <Icon name='id card  icon' color="green"  onClick={()=>{
                                 localStorage.setItem("permission","lecturer");
                                 localStorage.setItem("name",value.username);
                                 this.props.history.push("/see-student-lecture");
                                }}/>
                              </Button>
                            </Table.Cell>
                            <Table.Cell>  
                              <Button icon>
                                <Icon name='wrench  icon' color="green"  onClick={()=>{
                                  localStorage.setItem("permission","lecturer");
                                  localStorage.setItem("name",value.username);
                                  localStorage.setItem("id",value.id);
                                  this.props.history.push("/arrage-student-lecture");
                                }}/>
                              </Button>
                            </Table.Cell>

                            


                        </Table.Row>
                        ))}

                    
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='8'>



                                    
                       
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
               
                
               
                 
                
              
                      
                
                    
                    

              </Grid.Column>
             
              
            </Grid.Row>

            

          </Grid>
        </Container>
        
        
      </div>
    );
  };
}




export default withRouter(LectureDahsboard);
