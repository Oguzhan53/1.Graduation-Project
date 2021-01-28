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
        announcement:"",
        studentNum:0
    };
  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="admin"){
      toast.warning("You tried to access a page without authorization. You are being redirected to the admin menu");
      this.props.history.push("/");
    }

      
  };
  


  send = () => {
/* 
    localStorage.setItem("studentNum",this.state.studentNum);   
    this.props.history.push("/search-result"); */


    const { announcement ,studentNum}=this.state;
    
    fetch("http://localhost:8083/api/admin/announcement/"+studentNum,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
      body: JSON.stringify({announcement}),
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
            <h3 >Create Announcement</h3>




            
            <a class="item" onClick={() => {
                        this.logout();
                      }} >Log Out</a>
          </div>



        <Container>
          <Grid>
          <Header size="huge">Create Announcement</Header>
            <Grid.Row columns="equal" centered>
              <Grid.Column width={12}>
                
                            <div class="ui form">
                <div class="field">
                    
                    <textarea type="text" name="announcement" value={this.state.announcement}
                    onChange={this.handleChange}></textarea>
                </div>
                <Form.Field>
                    <label>Student Id </label>
                    <Form.Input
                      type="text" 
                      name="studentNum"
                      onChange={this.handleChange}
                      value={this.state.studentNum}
                      
                    />
                  </Form.Field>
                <ButtonGroup fluid>
                    <Button onClick={()=>{ 
           this.send()
        }}>Submit</Button>
                  </ButtonGroup>
                </div>
               

              </Grid.Column>
              
            </Grid.Row>
          </Grid>
        </Container>
        
        
      </div>
    );
  };
}




export default withRouter(LectureDahsboard);
