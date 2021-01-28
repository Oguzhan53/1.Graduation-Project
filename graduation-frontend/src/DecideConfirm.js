/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Container,Grid, Menu,Icon,Header,Table,Label,Button, Divider,Form,ButtonGroup} from "semantic-ui-react";
import './App.css';
import { withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class LectureDahsboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
        studentLec:[],
        currentPage:0,
        studentNum:"",
        isLoaded: true,
    };
  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="lecturer"){
      toast.warning("You tried to access a page without authorization.");
      this.props.history.push("/");
    }
    
    this.getStLecture();

    
      
  };
  


  getStLecture=()=> {
    fetch("http://localhost:8083/api/lecturer/waiting/lectures/"+localStorage.getItem("username"),
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



  deleteLec=(code,decide) =>{
    fetch("http://localhost:8083/api/lecturer/confirm/"+localStorage.getItem("id")+"/"+code+"/"+decide,
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
      if(decide ===1){
        toast.success("Succesfuly Confirmed.");
      }else{
        toast.success("Succesfuly Deleted.");
      }
     
      this.setState({studentLec:data})
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

  

  render = () =>{
    
    const {studentLec} = this.state;
    
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

            <Grid.Row columns="equal" centered>
              <Grid.Column width={12}>
              <Header size="huge">Confirmation</Header>

                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Lecture Code</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Name</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Credit</Table.HeaderCell>
                        <Table.HeaderCell>Lecture Akts</Table.HeaderCell>
                        <Table.HeaderCell>Confirmation</Table.HeaderCell>
                        <Table.HeaderCell>Confirm</Table.HeaderCell>
                        <Table.HeaderCell>Remove</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        
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
                                <Icon name='check box icon' color="green"  onClick={()=>{
                                  this.deleteLec(value.lecture.code,1);
                                }}/>
                              </Button>
                            </Table.Cell>
                            
                            <Table.Cell>  
                              <Button icon>
                                <Icon name='times icon' color="red"  onClick={()=>{
                                  this.deleteLec(value.lecture.code,0);
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
