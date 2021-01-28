package com.sezgin.oguzhan.graduation.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@DiscriminatorValue("LECTURERS")
public class Lecturer extends UserEntityBase {

    private static final long serialVersionUID = 1L;

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

    @Column(name = "STUDENT_NUMBER")
    private int stuNum;

    @OneToMany(mappedBy = "lecturer")
    @JsonBackReference
    private List<Student> students;

    @OneToMany(mappedBy = "lecturer")
    @JsonBackReference
    private List<Lecture> lectures;


    public boolean addLecture(Lecture lecture) {

        if(lectures.contains(lecture)) {
            return false;
        } else {
            lectures.add(lecture);
            return true;
        }
    }


    public boolean removeLecture(Lecture lecture) {

        if(!lectures.contains(lecture)) {
            return false;
        } else {
            return lectures.remove(lecture);
        }
    }


    public int getStuNum() {

        return stuNum;
    }


    public void setStuNum(int stuNum) {

        this.stuNum = stuNum;
    }


    public List<Lecture> getLectures() {

        return lectures;
    }


    public void setLectures(List<Lecture> lectures) {

        this.lectures = lectures;
    }


    public void setStudents(List<Student> students) {

        this.students = students;
    }


    public List<Student> getStudents() {

        return students;
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


    public void addStudent(Student student) {

        students.add(student);
    }


    public void removeStudent(Student student) {

        students.remove(student);
    }

    @PrePersist
    public void onPrePersist() {

        this.setActive(true);
        this.setRegDate(new Date());
        this.setStuNum(0);
    }
}
