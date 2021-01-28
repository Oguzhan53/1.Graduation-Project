/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Container,Grid, Menu,Icon,Header,Table,Label,Button, Divider,Form,ButtonGroup} from "semantic-ui-react";
import './App.css';
import { withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class Advisor extends React.Component{
  constructor(props){
    super(props);
    this.state={
        students: [],
        department:null,
        studentId:null,

    };
  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="lecturer"){
      toast.warning("You tried to access a page without authorization. You are being redirected to the login menu");
      this.props.history.push("/login");
    }
     

    this.getStudents();
      
  };
  
 


  getStudents=()=> {
    fetch("http://localhost:8083/api/lecturer/waiting/students",
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
 
        return Promise.reject(new Error("An error lecturer occured"));
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




  changePageTo = (i) => {
      this.setState({currentPage : i}, this.getStudents);
  };


  handleSubmit = (e) => {
/* 
    localStorage.setItem("studentNum",this.state.studentNum);   
    this.props.history.push("/search-result"); */
    
    fetch("http://localhost:8083/api/admin/student/number/"+this.state.studentNum,
    {
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
    })

    .then((r) =>{
        if(r.ok){
          return r;
        }
        if(r.status===401 || r.status === 403 ){
          return Promise.reject(new Error("An error occured"));
        }
        if(r.status===500){
          return Promise.reject(new Error("There is no book with this name"));
        }

      })
    .then((r) =>{
        return r.json();
    })
    .then((data) => {
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

  addStudent=(id) =>{
    fetch("http://localhost:8083/api/admin/advisor/"+id+"/"+localStorage.getItem("id"), {
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
      return r.json();
  })
    .then((data) =>{
      toast.success("Succesfuly added.");

      this.getStudents();
    })
    .catch((e) => {
        toast.error(e.message);
    });

  }



  render = () =>{
    
    const { students} = this.state;
    
    return (
      <div className="App">


<div class="ui left fixed vertical menu">
            <div class="item">
            <h1>Menu</h1>
            </div>
            
            <h3>Lecture Cofirmation</h3>

            <a class="item"onClick={() => {
                        localStorage.setItem("permission","lecturer");
                        this.props.history.push("/set-grade");
                      }} > 
                     Set Lecture Grades</a>

                     <a class="item"onClick={() => {
              localStorage.setItem("permission","lecturer");
              this.props.history.push("/lecture-student");
            }} > 
            Consulting Student</a>


            
            <a class="item" onClick={() => {
                        this.logout();
                      }} >Log Out</a>
          </div>
        <Container>
         

          <Grid>
            <Grid.Row columns="equal" >
              <Grid.Column width={12}>

              <Header size="huge">
                  Students Waiting for Confirmation</Header>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Student Name</Table.HeaderCell>
                        <Table.HeaderCell>Student Surname</Table.HeaderCell>
                        <Table.HeaderCell>Student Number</Table.HeaderCell>
                        <Table.HeaderCell>Student Department</Table.HeaderCell>
                        <Table.HeaderCell>See Chosen Lecture</Table.HeaderCell>
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
                            <Table.Cell>{value.id}</Table.Cell>
                            <Table.Cell>{value.name}</Table.Cell>
                            <Table.Cell>{value.surname}</Table.Cell>
                            <Table.Cell>{value.number}</Table.Cell>
                            <Table.Cell>{value.department}</Table.Cell>
                            <Table.Cell>  
                              <Button icon>
                                <Icon name='zoom in' color="green"  onClick={()=>{
                                 localStorage.setItem("permission","lecturer");
                                 localStorage.setItem("username",value.username);
                                 localStorage.setItem("id",value.id);
                                 this.props.history.push("/decide-confirm");
                                }}/>
                              </Button>
                            </Table.Cell>


                        </Table.Row>
                        ))}

                    
                    </Table.Body>
                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'>
                       
                       
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




export default withRouter(Advisor);
