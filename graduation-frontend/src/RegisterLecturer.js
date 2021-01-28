/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Form , Button,Container,Grid, ButtonGroup,Divider,Header,Icon} from "semantic-ui-react";
import './App.css';
import { Link ,withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class RegisterLecturer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      usernameError:null,
      password:"",
      passwordError:null,
      passwordRepeat:"",
      passwordRepeatError:null,
      name:"",
      surname:"",
      department:"",

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
   
    const { username , password , passwordRepeat,name,surname,department}=this.state;
    if(username.length<5 ||username.length >255){
      this.setState({
        usernameError: "Please check username",
      });
      return;
    }
    if(password.length<3 || password.length>255){
      this.setState({
        passwordError:"Please check password",
      });
      return;
    }
    if(password !== passwordRepeat){
      this.setState({
        passwordError:"Please check password",
        passwordRepeatError:"Please check password",
      });
      return;
    }

    fetch("http://localhost:8083/api/admin/lecturer",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
      body: JSON.stringify({username,password,name,surname,department}),
    })

    .then((r) =>{
      if(r.ok){
        return r;
      }
      if(r.status===401 || r.status === 403 ){
        return Promise.reject(new Error("An error occured"));
      }
      if( r.status===500){
        return Promise.reject(new Error("Duplicate entry.Plese change username"));
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
    const {
      usernameError,
      passwordError,
      passwordRepeatError,

    } = this.state;
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
            
            <h3> 
                        Register Lecturer</h3>

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
          <Header as='h2' icon centered>
                <Icon name='add user' centered/>
                REGİSTER  LECTURER

              </Header>
          <Grid>
            <Grid.Row columns="equal" centered>
              <Grid.Column width={8}>

                
                <Form onSubmit={this.handleSubmit}
                onReset={(e) =>{
                  e.preventDefault();
                  this.setState({
                    counter:0,
                    username:"",
                    password:"",
                    passwordRepeat:"",
                    name:"",
                    surname:"",
                    department:""

                  });
                }}
                
                >
                  <Form.Field>
                    <label>Username</label>
                    <Form.Input type="email" 
                      name="username" 
                      required
                      error={usernameError}
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
  
                  <Form.Field>
                    <label>Password</label>
                    <Form.Input 
                      type="password" 
                      name="password"
                      required
                      error={passwordError}
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
  
                  </Form.Field>
                  <Form.Field>
                    <label>Password(Again)</label>
                    <Form.Input
                      type="password" 
                      name="passwordRepeat"
                      required
                      error={passwordRepeatError}
                      value={this.state.passwordRepeat}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Name</label>
                    <Form.Input
                      type="text" 
                      name="name"
                      required
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Surname</label>
                    <Form.Input
                      type="text" 
                      name="surname"
                      required
                      value={this.state.surname}
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
                    <Button type="submit">Register</Button>
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




export default withRouter(RegisterLecturer);
