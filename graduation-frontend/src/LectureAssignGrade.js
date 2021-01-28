/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import {Container,Grid, Menu,Icon,Header,Table,Label,Button,Statistic, Divider,Form,ButtonGroup, TableCell, GridRow, GridColumn} from "semantic-ui-react";
import './App.css';
import { withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
import fetch from "isomorphic-unfetch";



class LectureDahsboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
        students:[],
        currentPage:0,
        midterm1:0,
        midterm2:0,
        final:0,
        mid1Av:0,
        mid2Av:0,
        finalAv:0,
        studentNum:0,
        isLoaded: true,
        passGrade:0,
        mid1Per:0,
        mid2Per:0,
        finalPer:0,
        tempName:""
    };

   

  }

  
  componentDidMount = () =>{
    if(localStorage.getItem("permission")!=="lecturer"){
      toast.warning("You tried to access a page without authorization.");
      this.props.history.push("/");
    }
    

    this.getStudents();
    
  };
  
  getStudents=()=> {
      fetch("http://localhost:8083/api/lecturer/lecture/students/"+localStorage.getItem("code"), {
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
        this.setState({students:data})
      })
      .catch((e) => {
        toast.error(e.message);
      });



  };


  addGrades= () =>{

    
    var av1=0,av2=0,av3=0
    this.state.students.map((row) => (av1 += row.midterm1,av2+=row.midterm2,av3+=row.finalGrade));
    av1 = av1/this.state.students.length
    av2 = av2/this.state.students.length
    av3 = av3/this.state.students.length
    this.setState({mid1Av :av1 } )
    this.setState({mid2Av :av2 } )
    this.setState({finalAv :av3 } )
    
  }


  calculateRes=()=> {

    this.addGrades();
    const{mid1Av,mid2Av,finalAv,mid1Per,mid2Per,finalPer,passGrade} = this.state
    console.log("mid1 Av : "+mid1Av)
    console.log("mid2 Av : "+mid2Av)
    console.log("Final Av : "+finalAv)
    console.log("mid1Per  : "+mid1Per)
    console.log("mid2Per  : "+mid2Per)
    console.log("finalPer  : "+finalPer)
    console.log("passGrade  : "+passGrade)

    fetch("http://localhost:8083/api/lecturer/calculate/"+localStorage.getItem("code"), {
        method : "POST",
        headers:{
          "Content-Type":"application/json",
        },
        credentials:"include",
        body: JSON.stringify({mid1Av,mid2Av,finalAv,mid1Per,mid2Per,finalPer,passGrade}),
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
      this.getStudents();
    })
    .catch((e) => {
      toast.error(e.message);
    });






};


 handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8083/api/lecturer/grade/"+localStorage.getItem("code")+"/"+this.state.midterm1+"/"+this.state.midterm2
    +"/"+this.state.final+"/"+this.state.studentNum,{
          method : "PUT",
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
        toast.success("Grades Assigned");
        this.getStudents();

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
    
    const {  students} = this.state;
    
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
              <Grid.Column width={9}>
              <Header size="huge">Students </Header>

                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Surname</Table.HeaderCell>
                        <Table.HeaderCell>Number</Table.HeaderCell>
                        <Table.HeaderCell>Midterm1</Table.HeaderCell>
                        <Table.HeaderCell>Midterm2</Table.HeaderCell>
                        <Table.HeaderCell>Final</Table.HeaderCell>
                        <Table.HeaderCell>Letter Grade</Table.HeaderCell>
                        
                        
                        
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
                            <Table.Cell>{value.student.name}</Table.Cell>
                            <Table.Cell>{value.student.surname}</Table.Cell>
                            <Table.Cell>{value.student.number}</Table.Cell>
                            <Table.Cell>{value.midterm1}</Table.Cell>
                            <Table.Cell>{value.midterm2}</Table.Cell>
                            <Table.Cell>{value.finalGrade}</Table.Cell>
                            <Table.Cell>{value.letterGrade}</Table.Cell>
                                  
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
                <GridRow>
                <div class="ui large label">
                  Midterm 1 Average :
                  <div class="detail">{this.state.mid1Av}</div>
                </div>
                <div class="ui large label">
                  Midterm 2 Average :
                  <div class="detail">{this.state.mid2Av}</div>
                </div>
                <div class="ui large label">
                  Final Average :
                  <div class="detail">{this.state.finalAv}</div>
                </div>
                <Divider/>
            <ButtonGroup >
                            
                    <Button type="reset" onClick={()=>{ 
            this.addGrades()
        }}>Calculate Averages</Button>
                    
                  </ButtonGroup>
            </GridRow>

              </Grid.Column>
              <Grid.Column  centered relaxed='very' width={3}>
              <Header size="huge">Assing Grade</Header>
              <Form  onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Student Number</label>
                  
                    <Form.Input  
                      name="studentNum" 
                      type="number"
                      required
                      value={this.state.studentNum}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  
                  
                  <Form.Field>
                  <label>Midterm 1</label>
                  
                    <Form.Input  
                      name="midterm1" 
                      type="number"
                      required
                      value={this.state.midterm1}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                  <label>Midterm 2</label>
                  
                    <Form.Input  
                      name="midterm2" 
                      type="number"
                      required
                      value={this.state.midterm2}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Form.Field>
                  <label>Final </label>
                  
                    <Form.Input  
                      name="final" 
                      type="number"
                      required
                      value={this.state.final}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                    

                  <ButtonGroup fluid>
                    <Button type="submit">Assign</Button>
                  </ButtonGroup>

                  </Form>

                
              </Grid.Column >


                
             
                  
              <GridColumn width={4}>
              <Header size="huge">Calculate Results</Header>
              <Form>

              <Form.Field>
              <label>Midterm 1 Percentage </label>
                  <Form.Input  
                    name="mid1Per" 
                    type="number"
                    required
                    value={this.state.mid1Per}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
              <label>Midterm 2 Percentage </label>
                  <Form.Input  
                    name="mid2Per" 
                    type="number"
                    required
                    value={this.state.mid2Per}
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field>
              <label>Final Percentage </label>
                  <Form.Input  
                    name="finalPer" 
                    type="number"
                    required
                    value={this.state.finalPer}
                    onChange={this.handleChange}
                  />
                </Form.Field>

              <Form.Field>
              <label>Passing Grade </label>
                  <Form.Input  
                    name="passGrade" 
                    type="number"
                    required
                    value={this.state.passGrade}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <ButtonGroup fluid>
              <Button onClick={()=>{ 
            this.calculateRes()
        }} >Calculate Letter Grade</Button>
            </ButtonGroup>

              </Form>
             
              </GridColumn>
              
            </Grid.Row>

           

            

          </Grid>
        </Container>
        
        
      </div>
    );
  };
}




export default withRouter(LectureDahsboard);
