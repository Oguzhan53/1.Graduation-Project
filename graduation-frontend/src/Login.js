import React, {useState} from 'react';

import {Container,Grid,Divider,Form,Button,ButtonGroup,Header,Icon} from "semantic-ui-react";
import './App.css';
import { useHistory} from 'react-router-dom';
import fetch from "isomorphic-unfetch";
import { toast } from 'react-toastify';


const Login = ({showRegisterLink}) => {

  const history = useHistory();
  const[usernamePassword,setUsernamePassword]= useState({
    username:"",
    password:"",
  });

  const[usernamePasswordError,setUsernamePasswordError]= useState({
    username:null,
    password:null,
  });

  const handleChange= (e) =>{
    const {currentTarget} = e;
    const {value , name} = currentTarget;
    setUsernamePassword({...usernamePassword,[name]:value});
  };


  const handleSubmit = (e) => {
    e.preventDefault();
   
    const { username , password }=usernamePassword;
    if(username.length<5 ||username.length >255){
      setUsernamePasswordError({
        ...usernamePasswordError,
        username: "Please check username",
      });
      return;
    } else{
      setUsernamePasswordError({
        username:null,
      })
    }
    if(password.length<3 || password.length>255){
      setUsernamePasswordError({
        ...usernamePasswordError,
        password:"Please check password",
      });
      return;
    }

    
    const formData = new URLSearchParams();
    formData.append("username",username);
    formData.append("password",password);
    fetch("http://localhost:8083/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
      },
      body:formData,
      credentials:"include",
    })
    .then((r) =>{
      if(r.ok){
        return r;
      }
      if(r.status===401 || r.status === 500  ){
        return Promise.reject(new Error("An error occured"));
      }
      if(r.status===403){
        return Promise.reject(new Error("Wrong username-password!!!"));
      }

    })
    .then((response) => {

      
      
      if(response.headers.get('User')==="0"){
        toast.success("Welcome admin.You are redirected to the menu page");
        setTimeout(()=> {
          localStorage.setItem("permission","admin");
          history.push("/lecturer-dashboard");
          
        },2000);

      }
      else if(response.headers.get('User')==="1"){
        toast.success("Welcome Lecturer .You are redirected to the dashboard page");
        setTimeout(()=> {
          localStorage.setItem("permission","lecturer");
          history.push("/lecture-confirm");
        },2000);
      }
      else if(response.headers.get('User')==="2"){
        toast.success("Welcome Student .You are redirected to the dashboard page");
        setTimeout(()=> {
          localStorage.setItem("permission","student");
          history.push("/student-announcement");
        },2000);
      }
      else{
        toast.error("Wrong User Type");
        window.location.reload();
      }
      
     
    })
    .catch((e) => {
      toast.error(e.message);
    });
  
  
  
  
  
  
  };




  
  return(
    <div className="App">
        <Container>
        <Header as='h2' icon centered>
                <Icon name='user circle' centered/>
                LOGIN 

              </Header>
          <Grid>

          
            <Grid.Row columns="equal" centered>

              <Grid.Column width={8}>

              
              

                <Form 
                  onSubmit={handleSubmit}
                  onReset={(e) =>{
                    e.preventDefault();
                    setUsernamePassword({username:"",password:""});
                  }}
                
                >
                  <Form.Field>
                    <label>Username</label>
                    <Form.Input type="email" 
                      name="username" 
                      required
                      error={usernamePasswordError.username}
                      value={usernamePassword.username}
                      onChange={handleChange}
                    />
                  </Form.Field>
  
                  <Form.Field>
                    <label>Password</label>
                    <Form.Input 
                      type="password" 
                      name="password"
                      required
                      error={usernamePasswordError.password}
                      value={usernamePassword.password}
                      onChange={handleChange}
                    />
  
                  </Form.Field>
                 
                  <ButtonGroup fluid>
                    <Button color="teal" type="reset">Reset</Button>
                    <Button type="submit">Login</Button>
                  </ButtonGroup>
                  
  
                </Form>
                


               
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        
        
      </div>

  )



}









export default Login;
