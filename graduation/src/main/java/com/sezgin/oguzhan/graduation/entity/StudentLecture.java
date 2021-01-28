package com.sezgin.oguzhan.graduation.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "STUDENT_LECTURE")
@AssociationOverrides({
                              @AssociationOverride(name = "studentLectureId.student",
                                                   joinColumns = @JoinColumn(name = "STUDENT_ID")),
                              @AssociationOverride(name = "studentLectureId.lecture",
                                                   joinColumns = @JoinColumn(name = "LECTURE_ID"))})
public class StudentLecture {

    private StudentLectureId studentLectureId = new StudentLectureId();

    @Column(name = "CONFIRMATION")
    private String confirmation;

    @Column(name = "DATA_OF_REGISTRATION")
    private Date registeredDate;

    @Column(name = "MIDTERM_1")
    private int midterm1;

    @Column(name = "MIDTERM_2")
    private int midterm2;

    @Column(name = "FINAL")
    private int finalGrade;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "LETTER GRADE")
    private String letterGrade;


    @EmbeddedId
    public StudentLectureId getStudentLectureId() {

        return studentLectureId;
    }


    public void setStudentLectureId(StudentLectureId studentLectureId) {

        this.studentLectureId = studentLectureId;
    }


    public void setStatus(String status) {

        this.status = status;
    }


    public String getStatus() {

        return status;
    }


    @Transient
    public Student getStudent() {

        return getStudentLectureId().getStudent();
    }


    public void setStudent(Student student) {

        this.getStudentLectureId().setStudent(student);
    }


    @Transient
    public Lecture getLecture() {

        return getStudentLectureId().getLecture();
    }


    public void setLecture(Lecture lecture) {

        this.getStudentLectureId().setLecture(lecture);
    }


    public Date getRegisteredDate() {

        return registeredDate;
    }


    public void setRegisteredDate(Date registeredDate) {

        this.registeredDate = registeredDate;
    }


    public int getMidterm1() {

        return midterm1;
    }


    public void setMidterm1(int midterm1) {

        this.midterm1 = midterm1;
    }


    public int getMidterm2() {

        return midterm2;
    }


    public void setMidterm2(int midterm2) {

        this.midterm2 = midterm2;
    }


    public String getLetterGrade() {

        return letterGrade;
    }


    public void setLetterGrade(String letterGrade) {

        this.letterGrade = letterGrade;
    }


    public int getFinalGrade() {

        return finalGrade;
    }


    public void setFinalGrade(int finalGrade) {

        this.finalGrade = finalGrade;
    }


    public String getConfirmation() {

        return confirmation;
    }


    public void setConfirmation(String confirmation) {

        this.confirmation = confirmation;
    }


    public boolean equals(Object o) {

        if(this == o) {
            return true;
        }
        if(o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentLecture that = (StudentLecture) o;

        if(getStudentLectureId() != null ? !getStudentLectureId().equals(that.getStudentLectureId())
                : that.getStudentLectureId() != null) {
            return false;
        }

        return true;
    }


    public int hashCode() {

        return (getStudentLectureId() != null ? getStudentLectureId().hashCode() : 0);
    }


    @PrePersist
    public void onPrePersist() {

        this.setConfirmation("WAITING");
        this.setLetterGrade("CONTINUE");
        this.setStatus("CONTINUE");
        this.setRegisteredDate(new Date());
    }


    @PreUpdate
    public void onPreUpdate() {

        this.setRegisteredDate(new Date());
    }
}
