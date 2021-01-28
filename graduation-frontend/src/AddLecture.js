/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Form , Button,Container,Grid, ButtonGroup,Divider,Header,Icon} from "semantic-ui-react";
import './App.css';
import { Link ,withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class AddLecture extends React.Component{
  constructor(props){
    super(props);
    this.state={
      code:"",
      name:"",
      semesterNum:0,
      credit:0,
      quota:0,
      akts:0,
      department:""

    };
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
        },1000);
      })
      .catch((e) => {
          toast.error(e.message);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
   
    const { code , name , semesterNum,credit,quota,akts,department}=this.state;
    

    fetch("http://localhost:8083/api/admin/lecture",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
      body: JSON.stringify({code,name,semesterNum,credit,quota,akts,department}),
    })

    .then((r) =>{
      if(r.ok){
        return r;
      }
      if(r.status===401 || r.status === 403 ){
        return Promise.reject(new Error("An error occured"));
      }
      if(r.status===500){
        return Promise.reject(new Error("Duplicate entry.Plese change lecture code"));
      }


    })
    .then((r) => r.json())
    .then((response) => {
      toast.success("Succesfuly registered.You are redirected to the login page");
     /*  setTimeout(()=> {
        this.props.history.push("/login");
      },2000); */
     
    })
    .catch((e) => {
      toast.error(e.message);
    });

    

  };
  /*
  componentDidMount = () => {
    setInterval ( () =>{
      console.log("Procces do again"+ new Date());
    },1000 )
  }
  */
  render = () =>{

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

            <a class="item"  onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/lecture-dashboard");
                      }} >Lecture Dashboard</a>

              <h3 >Add  New Lecture</h3>

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
          <Header as='h2' icon centered>
                <Icon name='book' centered/>
                ADD NEW LECTURE

              </Header>
          <Grid>
            <Grid.Row columns="equal" centered>
              <Grid.Column width={8}>

                
                <Form onSubmit={this.handleSubmit}
                onReset={(e) =>{
                  e.preventDefault();
                  this.setState({
                    code:"",
                    name:"",
                    semesterNum:0,
                    credit:0,
                    quota:0,
                    akts:0,
                    department:""

                  });
                }}
                
                >
                  <Form.Field>
                    <label>Name</label>
                    <Form.Input type="text" 
                      name="name" 
                      required
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
  
                  <Form.Field>
                    <label>Code</label>
                    <Form.Input 
                      type="text" 
                      name="code"
                      required

                      value={this.state.code}
                      onChange={this.handleChange}
                    />
  
                  </Form.Field>
            
                  <Form.Field>
                    <label>Semester Number</label>
                    <Form.Input
                      type="number" 
                      name="semesterNum"
                      required
                      value={this.state.semesterNum}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Credit</label>
                    <Form.Input
                      type="number" 
                      name="credit"
                      required
                      value={this.state.credit}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Quota </label>
                    <Form.Input
                      type="number" 
                      name="quota"
                      required
                      value={this.state.quota}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Akts </label>
                    <Form.Input
                      type="number" 
                      name="akts"
                       required
                      value={this.state.akts}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  
                  <Form.Field>
                    <label>Department </label>
                    <Form.Input
                      type="text" 
                      name="department"
                      required
                      value={this.state.department}
                      onChange={this.handleChange}
                    />
                  </Form.Field>




                  <ButtonGroup fluid>
                    <Button color="teal" type="reset">Reset</Button>
                    <Button type="submit">Add</Button>
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




export default withRouter(AddLecture);
