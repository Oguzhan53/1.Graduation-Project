package com.sezgin.oguzhan.graduation.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@DiscriminatorValue("STUDENTS")
public class Student extends UserEntityBase {

    private static final long serialVersionUID = 1L;

    @Column(name = "NUMBER", unique = true)
    private Long number;

    @Column(name = "DEPARTMENT")
    private String department;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "CITY")
    private String city;

    @Column(name = "DISTRICT")
    private String district;

    @Column(name = "POST_CODE")
    private long postCode;

    @Column(name = "PHONE_NUMBER_1")
    private String phoneNum1;

    @Column(name = "PHONE_NUMBER_2")
    private String phoneNum2;

    @Column(name = "E_MAIL_1")
    private String eMail1;

    @Column(name = "E_MAIL_2")
    private String eMail2;

    @Column(name = "WEB_PAGE")
    private String webPage;

    @Column(name = "CLASS_NUMBER")
    private int classNum;

    @Column(name = "SEMESTER_NUMBER")
    private int semesterNum;

    @Column(name = "CREDIT")
    private int credit;

    @Column(name = "AVERAGE")
    private double gradeAverage;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "studentLectureId.student", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<StudentLecture> lectures = new HashSet<StudentLecture>(0);

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "ADVISOR", joinColumns = {@JoinColumn(name = "STUDENT_ID", referencedColumnName = "ID")},
               inverseJoinColumns = {@JoinColumn(name = "LECTURER_ID", referencedColumnName = "ID")})
    @JsonManagedReference
    private Lecturer lecturer;

    @ManyToMany(mappedBy = "students")
    @JsonBackReference
    private List<Announcement> announcements;


    public int getCredit() {

        return credit;
    }


    public void setCredit(int credit) {

        this.credit = credit;
    }


    public double getGradeAverage() {

        return gradeAverage;
    }


    public void setGradeAverage(double gradeAverage) {

        this.gradeAverage = gradeAverage;
    }


    public Long getNumber() {

        return number;
    }


    public void setNumber(Long number) {

        this.number = number;
    }


    public Set<StudentLecture> getLectures() {

        return lectures;
    }


//    public Set<StudentLecture> getWaitingLectures() {
//
//        Set<StudentLecture> temp = new HashSet<>();
//        for(StudentLecture st : this.lectures) {
//            if("WAITING".equals(st.getConfirmation())) {
//                temp.add(st);
//            }
//        }
//        return temp;
//    }


    public void setLectures(Set<StudentLecture> lectures) {

        this.lectures = lectures;
    }


    public boolean addLecture(StudentLecture lecture) {

        if(lectures.contains(lecture)) {
            return false;
        } else {
            return this.lectures.add(lecture);
        }
    }


    public boolean removeLecture(StudentLecture lecture) {

        if(!lectures.contains(lecture)) {
            return false;
        } else {
            return this.lectures.remove(lecture);
        }
    }


    public List<Announcement> getAnnouncements() {

        return announcements;
    }


    public void setAnnouncements(List<Announcement> announcements) {

        this.announcements = announcements;
    }


    public static long getSerialVersionUID() {

        return serialVersionUID;
    }


    public String getDepartment() {

        return department;
    }


    public void setDepartment(String department) {

        this.department = department;
    }


    public String getAddress() {

        return address;
    }


    public void setAddress(String address) {

        this.address = address;
    }


    public String getCity() {

        return city;
    }


    public void setCity(String city) {

        this.city = city;
    }


    public String getDistrict() {

        return district;
    }


    public void setDistrict(String district) {

        this.district = district;
    }


    public long getPostCode() {

        return postCode;
    }


    public void setPostCode(long postCode) {

        this.postCode = postCode;
    }


    public String getPhoneNum1() {

        return phoneNum1;
    }


    public void setPhoneNum1(String phoneNum1) {

        this.phoneNum1 = phoneNum1;
    }


    public String getPhoneNum2() {

        return phoneNum2;
    }


    public void setPhoneNum2(String phoneNum2) {

        this.phoneNum2 = phoneNum2;
    }


    public String geteMail1() {

        return eMail1;
    }


    public void seteMail1(String eMail1) {

        this.eMail1 = eMail1;
    }


    public String geteMail2() {

        return eMail2;
    }


    public void seteMail2(String eMail2) {

        this.eMail2 = eMail2;
    }


    public String getWebPage() {

        return webPage;
    }


    public void setWebPage(String webPage) {

        this.webPage = webPage;
    }


    public Lecturer getLecturer() {

        return lecturer;
    }


    public void setLecturer(Lecturer lecturer) {

        this.lecturer = lecturer;
    }


    public int getSemesterNum() {

        return semesterNum;
    }


    public void setSemesterNum(int semesterNum) {

        this.semesterNum = semesterNum;
    }


    public int getClassNum() {

        return classNum;
    }


    public void setClassNum(int classNum) {

        this.classNum = classNum;
    }


    public void removeLecturer() {

        this.lecturer = null;
    }


    @PrePersist
    public void onPrePersist() {

        this.setActive(true);
        this.setRegDate(new Date());
        this.setCredit(35);
        this.setGradeAverage(0);
    }
}
