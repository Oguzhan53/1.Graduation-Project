/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Container,Grid, Menu,Icon,Header,Table,Label,Button,Statistic, Divider,Form,ButtonGroup, GridColumn} from "semantic-ui-react";
import './App.css';
import { withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class StudentAnnouncement extends React.Component{
  constructor(props){
    super(props);
    this.state={
        announcement: [],
        name:""
    };
  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="student"){
      toast.warning("You tried to access a page without authorization.");
      this.props.history.push("/student-announcement");
    }
    
    this.getStudents();
      
  };
  
  getStudents=()=> {
      fetch("http://localhost:8083/api/student/announcement",
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
        this.setState({announcement:data})
        
      })
      .catch((e) => {
        toast.error(e.message);
      });



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

 



  render = () =>{
    
    const { announcement } = this.state;
    
    return (
        <div className="App">

          <div class="ui left fixed vertical menu">
          <div class="item">
            <h1>Menu</h1>
            </div>

            <h3 class="ui header">Announcement</h3>
            <a class="item"onClick={()=>{ 
                localStorage.setItem("permission","student");
                    this.props.history.push("/student-lecture"); 
                    }}>Chose Lecture</a>

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
          
    




                <h2 class="ui header">ANNOUNCEMENT</h2>
                {announcement &&
                        announcement.slice(0).reverse().map((value)=>(
                            
                            <div class="ui raised very padded text container segment">
                
                        <p>{value.announcement}</p>
                        <p></p>
                    </div>
                 ))}
      </div>

      

      
    );
  };
}




export default withRouter(StudentAnnouncement);
