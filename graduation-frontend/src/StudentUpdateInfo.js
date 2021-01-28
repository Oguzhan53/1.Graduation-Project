/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Form , Button,Container,Grid, ButtonGroup,Divider,Header,Icon} from "semantic-ui-react";
import './App.css';
import { Link ,withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class RegisterStudent extends React.Component{
  constructor(props){
    super(props);
    this.state={
        student:{},
        address:"",
        city:"",
        district:"",
        postCode:"",
        phoneNum1:"",
        phoneNum2:"",
        eMail1:"",
        eMail2:"",
        webPage:""




    };
  }

  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="student"){
      toast.warning("You tried to access a page without authorization.");
      this.props.history.push("/");
    }
    
    this.getStudent();
    
      
  };


  getStudent =() =>{
    fetch("http://localhost:8083/api/student/me", 
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
      this.setState({student:data})
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
        },1000);
      })
      .catch((e) => {
          toast.error(e.message);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { address,city,district,postCode,phoneNum1,phoneNum2,eMail1,eMail2,webPage}=this.state;
 

    fetch("http://localhost:8083/api/student/student",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
      body: JSON.stringify({address,city,district,postCode,phoneNum1,phoneNum2,eMail1,eMail2,webPage}),
    })

    .then((r) =>{
      if(r.ok){
        return r;
      }
      if(r.status===401 || r.status === 403 || r.status===500){
        return Promise.reject(new Error("An error occured"));
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
    const { student} = this.state;
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
        <a class="item" onClick={() => {
            localStorage.setItem("permission","student");
                       this.props.history.push("/student-lecture-grade"); 
                      }} >Lecture Grade</a>
        <h3 >Update Info</h3>

        <a class="item" onClick={() => {
                    this.logout();
                }} >Log Out</a>
        </div>
        <Container>
          <Header as='h2' icon centered>
                <Icon name='edit' centered/>
                Update Information

              </Header>
          <Grid>
            <Grid.Row columns="equal" centered>
              <Grid.Column width={8}>

                
                <Form onSubmit={this.handleSubmit}
                onReset={(e) =>{
                  e.preventDefault();
                  this.setState({
                    address:"",
                    city:"",
                    district:"",
                    postCode:0,
                    phoneNumber1:"",
                    phoneNumber2:"",
                    eMail1:"",
                    eMail2:"",
                    webPage:""
                  });
                }}
                
                >
                  <Form.Field>
                    <label>Username</label>
                    <Form.Input type="email" 
                      name="username" 

                      value={student.username}
                      disabled
                    />
                  </Form.Field>

                  <Form.Field>
                    <label>Name</label>
                    <Form.Input
                      type="text" 
                      name="name"
                      
                      value={student.name}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Surname</label>
                    <Form.Input
                      type="text" 
                      name="surname"
                      
                      value={student.surname}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Number</label>
                    <Form.Input
                      type="number" 
                      name="number"
                    
                      value={student.number}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Class </label>
                    <Form.Input
                      type="number" 
                      name="classNum"
                      required
                      value={student.classNum}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Department </label>
                    <Form.Input
                      type="text" 
                      name="department"
                      
                      value={student.department}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Address</label>
                    <Form.Input
                      type="text" 
                      name="address"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <Form.Input
                      type="text" 
                      name="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>District</label>
                    <Form.Input
                      type="text"
                      name="district" 
                      value={this.state.district}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Post Code</label>
                    <Form.Input
                      type="number" 
                      name="postCode"
                      value={this.state.postCode}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Phoen Number 1</label>
                    <Form.Input
                      type="text"
                      name="phoneNum1" 
                      value={this.state.phoneNum1}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Phone Number 2</label>
                    <Form.Input
                      type="text" 
                      name="phoneNum2"
                      value={this.state.phoneNum2}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>E Mail 1</label>
                    <Form.Input
                      type="email" 
                      name="eMail1"
                      value={this.state.eMail1}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>E Mail 2</label>
                    <Form.Input
                      type="email"
                      name="eMail2" 
                      value={this.state.eMail2}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Webpage</label>
                    <Form.Input
                      type="url"
                      name="webPage" 
                      value={this.state.webPage}
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




export default withRouter(RegisterStudent);
