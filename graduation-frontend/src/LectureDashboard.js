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
        currentPage:0,
        studentNum:"",
        isLoaded: true,
    };
  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="admin"){
      toast.warning("You tried to access a page without authorization. You are being redirected to the admin menu");
      this.props.history.push("/edit-users");
    }
    
    this.getLecture();
      
  };
  
  getLecture=()=> {
      fetch("http://localhost:8083/api/admin/lecture?"+
      new URLSearchParams({pageNumber: this.state.currentPage}), {
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
        this.setState({lectures:data})
      })
      .catch((e) => {
        toast.error(e.message);
      });



  };

  changePageTo = (i) => {
      this.setState({currentPage : i}, this.getLecture);
  };


  handleSubmit = (e) => {
/* 
    localStorage.setItem("studentNum",this.state.studentNum);   
    this.props.history.push("/search-result"); */
    
    fetch("http://localhost:8083/api/admin/lecture/page/code/"+this.state.studentNum,
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
    this.setState({lectures:data})
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

  removeLecture=(id) =>{
    fetch("http://localhost:8083/api/admin/lecture/"+id,
       {
          method : "DELETE",
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
      toast.success("Succesfuly deleted.");
      this.setState({lectures:data})
    })
    .catch((e) => {
        toast.error(e.message);
    });

  }



  render = () =>{
    
    const {  lectures } = this.state;
    
    return (
      <div className="App">


<div class="ui left fixed vertical menu">
           <div class="item">
            <h1>Menu</h1>
            </div>

            <a class="item"onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/lecturer-dashboard");
                      }} > Lecturers Dashboard</a>
            <a class="item"onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/register-lecturer");
                        
                      }}> 
                        Register Lecturer</a>

            <a class="item"onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/student-dashboard");
                      }} > 
                      Student Dashboard</a>

              <a class="item" onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/register-student");
                      }} >Register Student</a>

            <h3 >Lecture Dashboard</h3>

              <a class="item"  onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/add-lecture");
                      }} >Add  New Lecture</a>

                <a class="item"  onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/advisor");
                      }} >
                      Students Without Advisor</a>

              <a class="item"  onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/lecturer-lecture");
                      }} >Lectures Without Lecturer</a>



            
            <a class="item" onClick={() => {
                        this.logout();
                      }} >Log Out</a>
          </div>



        <Container>
          <Grid>
          <Header size="huge">LECTURES</Header>
            <Grid.Row columns="equal" centered>
              <Grid.Column width={12}>
                

                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Name</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Code</Table.HeaderCell>
                        <Table.HeaderCell>Semester Number</Table.HeaderCell>
                        <Table.HeaderCell>Credit</Table.HeaderCell>
                        <Table.HeaderCell>Quota</Table.HeaderCell>
                        <Table.HeaderCell>Akts</Table.HeaderCell>
                        <Table.HeaderCell>Remove Lecture</Table.HeaderCell>
                        <Table.HeaderCell>Change Lecturer</Table.HeaderCell>
                        
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {lectures &&
                        lectures.content &&
                        lectures.content.map((value,index)=>(
                            <Table.Row> 
                            <Table.Cell>
                              <Label ribbon>
                                {lectures.size * lectures.number +(index+1)}
                              </Label>
                            </Table.Cell>
                            <Table.Cell>{value.id}</Table.Cell>
                            <Table.Cell>{value.name}</Table.Cell>
                            <Table.Cell>{value.code}</Table.Cell>
                            <Table.Cell>{value.semesterNum}</Table.Cell>
                            <Table.Cell>{value.credit}</Table.Cell>
                            <Table.Cell>{value.quota}</Table.Cell>
                            <Table.Cell>{value.akts}</Table.Cell>
                            <Table.Cell>  
                              <Button icon>
                                <Icon name='times icon' color="red"  onClick={()=>{
                                  this.removeLecture(value.id);
                                }}/>
                              </Button>
                            </Table.Cell>
                            <Table.Cell>  
                              <Button icon>
                                <Icon name='exchange icon' color="black"  onClick={()=>{
                                  localStorage.setItem("permission","admin");
                                  localStorage.setItem("code",value.code);
                                  localStorage.setItem("department",value.department);
                                  this.props.history.push("/assign-lecturer-lecture"); 
                                  
                                }}/>
                              </Button>
                            </Table.Cell>

                        </Table.Row>
                        ))}

                    
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='10'>
                        <Menu floated='right' pagination>
                            <Menu.Item 
                                onClick={() =>{
                                    this.changePageTo(this.state.currentPage - 1);
                                }}
                             as='a' 
                             icon
                             disabled={lectures.first}
                             >
                            <Icon name='chevron left' />
                            </Menu.Item>

                           
                           
                            <Menu.Item 
                                onClick={() => {
                                    this.changePageTo(this.state.currentPage + 1);
                                }}
                                icon
                                disabled={lectures.last}
                                as='a' >
                            <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                       
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
               
                <Divider/>
               
                  <br/>
                  
                <br/>
                
                <Statistic floated='right'>
                    <Statistic.Value>{lectures.totalElements}</Statistic.Value>
                    <Statistic.Label>Total Number Of Lectures</Statistic.Label>
                </Statistic>
                      
                


              </Grid.Column>
              <Grid.Column  centered relaxed='very' stackable>
              <Form  onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Lecture Code</label>
                    <Form.Input  
                      name="studentNum" 
                      type="text"
                      required
                      value={this.state.studentNum}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <ButtonGroup fluid>
                    <Button type="submit">Search</Button>
                  </ButtonGroup>

                  </Form>

                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        
        
      </div>
    );
  };
}




export default withRouter(LectureDahsboard);
