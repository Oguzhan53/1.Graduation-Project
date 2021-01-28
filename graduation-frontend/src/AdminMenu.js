import React from 'react';

import { Button,Container,Grid,Divider,Icon} from "semantic-ui-react";
import './App.css';
import { withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';




class AdminMenu extends React.Component{
  constructor(props){
    super(props);
    this.state={
    };
  }

  componentDidMount = () =>{
    if(localStorage.getItem("permission")==="user"){
      toast.warning("You tried to access a page without authorization. You are being redirected to the dashboard page");
      this.props.history.push("/dashboard");
    }
    else if(localStorage.getItem("permission")!=="admin"){
      toast.warning("You tried to access a page without authorization. You are being redirected to the login page");
      this.props.history.push("/login");
    }

    
};


    
  render = () =>{

    return (
        
      <div className="Menu">
        
        
        
        
        
        <Container>
  
          <Grid>
            <Grid.Row columns="equal" centered relaxed='very' stackable >
              <Grid.Column width={8}>
                <Button Icon size='massive'color="green"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/register-lecturer");
                      }}>
                    <i class="user plus icon"></i>
                        Register Lecturer
                </Button>
              </Grid.Column>

              <Grid.Column verticalAlign='right' centered relaxed='very' stackable >
              <Button Icon size='massive'color="red"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/lecturer-dashboard");
                      }}>
                    <i class="user times icon"></i>
                      Remove Lecturer
                </Button>
                </Grid.Column>


            </Grid.Row>

            <Grid.Row columns="equal" centered relaxed='very' stackable >
              <Grid.Column width={8}>
                <Button Icon size='massive'color="green"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/register-student");
                      }}>
                    <i class="address card icon"></i>
                        Register Student
                </Button>
              </Grid.Column>

              <Grid.Column verticalAlign='right' centered relaxed='very' stackable >
              <Button Icon size='massive'color="red"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/student-dashboard");
                      }}>
                    <i class="user times icon"></i>
                      Remove Student
                </Button>
                </Grid.Column>


            </Grid.Row>

            <Grid.Row columns="equal" centered relaxed='very' stackable >
              <Grid.Column width={8}>
                <Button Icon size='massive'color="green"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/add-lecture");
                      }}>
                   <i class="book icon"></i>
                        Add Lecture
                </Button>
              </Grid.Column>

              <Grid.Column verticalAlign='right' centered relaxed='very' stackable >
              <Button Icon size='massive'color="red"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/lecture-dashboard");
                      }}>
                    <i class="times icon"></i>
                      Remove Lecture
                </Button>
                </Grid.Column>

                <Grid.Column verticalAlign='right' centered relaxed='very' stackable >
              <Button Icon size='massive'color="red"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/advisor");
                      }}>
                    <i class="times icon"></i>
                      Advisor
                </Button>
                </Grid.Column>

                <Grid.Column verticalAlign='left' centered relaxed='very' stackable >
              <Button Icon size='massive'color="red"
                      onClick={() => {
                        localStorage.setItem("permission","admin");
                        this.props.history.push("/lecturer-lecture");
                      }}>
                    <i class="times icon"></i>
                      Assign Lecture to Lecturer
                </Button>
                </Grid.Column>


              


            </Grid.Row>
          </Grid>
          <Divider vertical><Icon name="angle double left"/> <Icon name="angle double right"/>  </Divider>
        </Container>
        
        
      </div>
    );
  };
}




export default withRouter(AdminMenu);
