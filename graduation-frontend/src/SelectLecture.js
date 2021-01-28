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
    this.getLecture();
    
      
  };
  
  getLecture=()=> {
      fetch("http://localhost:8083/api/student/all/lecture?"+
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

  getStLecture=()=> {
    fetch("http://localhost:8083/api/student/waiting/lectures",
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



  changePageTo = (i) => {
      this.setState({currentPage : i}, this.getLecture);
  };


  handleSubmit = (e) => {
/* 
    localStorage.setItem("studentNum",this.state.studentNum);   
    this.props.history.push("/search-result"); */
    
    fetch("http://localhost:8083/api/student/lecture/page/code/"+this.state.studentNum,
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
          return Promise.reject(new Error("There is no student with this number"));
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


  deleteLec=(code) =>{
    fetch("http://localhost:8083/api/student/lecture/"+code,
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
          //return Promise.reject(new Error("An error occured"));
          return r.json().then((body) => {
            throw new Error(body.error)
          })
        }
        
    })
    .then((r) =>{
      return r.json();
  })
    .then((data) =>{
      toast.success("Succesfuly deleted.");
      //this.setState({studentLec:data})
      this.getStLecture();
    })
    .catch((e) => {
        toast.error(e.message);
    });

  }

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

  addLecture=(code) =>{
    fetch("http://localhost:8083/api/student/lecture/"+code,
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
          //return Promise.reject(new Error("An error occured"));
          return r.json().then((body) => {
            throw new Error(body.error)
          })
        }
        
    })
    .then((r) =>{
      return r.json();
  })
    .then((data) =>{
      toast.success("Succesfuly added.");
      this.getStLecture();
      //window.location.reload();
     // this.setState({studentLec:data})
    })
    .catch((e) => {
        toast.error(e.message);
    });

  }



  render = () =>{
    
    const {  lectures ,studentLec} = this.state;
    
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
              

            <h3 class=""ui header>Chose Lecture</h3>
            <a class="item" onClick={() => {
               localStorage.setItem("permission","student");
                       this.props.history.push("/student-lecture-grade"); 
                      }} >Lecture Grade</a>

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
              <Grid.Column width={12}>
              <Header size="huge">Lectures</Header>

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
                        <Table.HeaderCell>Choose Lecture</Table.HeaderCell>
                        
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
                                <Icon name='check icon' color="green"  onClick={()=>{
                                  this.addLecture(value.code);
                                }}/>
                              </Button>
                            </Table.Cell>

                        </Table.Row>
                        ))}

                    
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='9'>
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
                  <div>
                   
                  </div>
                <br/>
                
              
                      
                


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

            <Grid.Row columns="equal" centered>
              <Grid.Column width={12}>
              <Header size="huge">Lectures Pending Confirmation</Header>

                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Lecture Code</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Name</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Credit</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Akts</Table.HeaderCell>
                        <Table.HeaderCell>Confirmation</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>

                        
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
                            <Table.Cell>{value.confirmation}</Table.Cell>
                            <Table.Cell>  
                              <Button icon>
                                <Icon name='times icon' color="red"  onClick={()=>{
                                  this.deleteLec(value.lecture.code);
                                }}/>
                              </Button>
                            </Table.Cell>

                        </Table.Row>
                        ))}

                    
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='9'>

                       
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
               
                <Divider/>
               
                  <br/>
                  
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
