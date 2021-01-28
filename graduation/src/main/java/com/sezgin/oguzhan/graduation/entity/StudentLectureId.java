package com.sezgin.oguzhan.graduation.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.ManyToOne;
import java.io.Serializable;

public class StudentLectureId implements Serializable {

    private Student student;

    private Lecture lecture;


    @ManyToOne
    @JsonManagedReference
    public Student getStudent() {

        return student;
    }


    public void setStudent(Student student) {

        this.student = student;
    }


    @ManyToOne
    @JsonManagedReference
    public Lecture getLecture() {

        return lecture;
    }


    public void setLecture(Lecture lecture) {

        this.lecture = lecture;
    }


    public boolean equals(Object o) {

        if(this == o) {
            return true;
        }
        if(o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentLectureId that = (StudentLectureId) o;

        if(student != null ? !student.equals(that.student) : that.student != null) {
            return false;
        }
        if(lecture != null ? !lecture.equals(that.lecture) : that.lecture != null) {
            return false;
        }

        return true;
    }


    public int hashCode() {

        int result;
        result = (student != null ? student.hashCode() : 0);
        result = 31 * result + (lecture != null ? lecture.hashCode() : 0);
        return result;
    }
}
