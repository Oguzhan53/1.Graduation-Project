import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./Login";


import AdminMenu from "./AdminMenu";
import RegisterStudent from "./RegisterStudent";
import RegisterLecturer from "./RegisterLecturer";
import AddLecture from "./AddLecture";
import StudentDasboard from "./StudentDasboard";
import LecturerDashboard from "./LecturerDashboard";
import LectureDashboard from "./LectureDashboard";
import Advisor from "./Advisor";
import SelectLecture from "./SelectLecture";
import StudentAnnoucement from "./StudentAnnoucement";
import StudentSeeGrade from "./StudentSeeGrade";
import StudentUpdateInfo from "./StudentUpdateInfo";
import AssignAdvisor from "./AssignAdvisor";
import AssignLectureToLecturer from "./AssignLectureToLecturer";
import AssignLectureToLecturer2 from "./AssignLectureToLecturer2";
import LectureConfirm from "./LectureConfirm";
import DecideConfirm from "./DecideConfirm";
import LectureSetGrade from "./LectureSetGrade";
import LectureAssignGrade from "./LectureAssignGrade";
import CreateAnnouncement from "./CreateAnnouncement";
import LecturerStudent from "./LecturerStudent";
import LecturerAddLec from "./LecturerAddLec";
import LecturerSeeStLec from "./LecturerSeeStLec";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>

          <Route exact path="/">
              <Login showRegisterLink />
          </Route>

     


          <Route path="/admin-menu">
              <AdminMenu />
          </Route>
          <Route path="/register-student">
              <RegisterStudent />
          </Route>
          <Route path="/register-lecturer">
              <RegisterLecturer />
          </Route>
          <Route path="/add-lecture">
              <AddLecture />
          </Route>
          <Route path="/student-dashboard">
              <StudentDasboard />
          </Route>
          <Route path="/lecturer-dashboard">
              <LecturerDashboard />
          </Route>
          <Route path="/lecture-dashboard">
              <LectureDashboard />
          </Route>
          <Route path="/advisor">
              <Advisor />
          </Route>
          <Route path="/student-lecture">
              <SelectLecture />
          </Route>
          <Route path="/student-announcement">
              <StudentAnnoucement />
          </Route>
          <Route path="/student-lecture-grade">
              <StudentSeeGrade />
          </Route>
          <Route path="/student-update-info">
              <StudentUpdateInfo />
          </Route>
          <Route path="/assign-advisor">
              <AssignAdvisor />
          </Route>
          <Route path="/create-announcement">
              <CreateAnnouncement />
          </Route>

          <Route path="/lecturer-lecture">
              <AssignLectureToLecturer />
          </Route>

          <Route path="/assign-lecturer-lecture">
              <AssignLectureToLecturer2 />
          </Route>

          <Route path="/lecture-confirm">
              <LectureConfirm />
          </Route>
          <Route path="/decide-confirm">
              <DecideConfirm />
          </Route>
          <Route path="/set-grade">
              <LectureSetGrade />
          </Route>

          <Route path="/assign-grade">
              <LectureAssignGrade />
          </Route>

          <Route path="/lecture-student">
              <LecturerStudent />
          </Route>
        
          <Route path="/arrage-student-lecture">
              <LecturerAddLec />
          </Route>

          <Route path="/see-student-lecture">
              <LecturerSeeStLec />
          </Route>




          <Route path="*">
              <h1>404 / Page can not found</h1>
          </Route>

          
        </Switch>
      </div>
    </Router>
  );
}