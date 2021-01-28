package com.sezgin.oguzhan.graduation.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;




@Entity
@Table(name = "LECTURES")
public class Lecture {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "DATA_OF_REGISTRATION")
    private Date regDate;

    @Column(name = "ACTIVE")
    private boolean active;

    @Column(name = "CODE", unique = true)
    private String code;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SEMESTER_NUM")
    private int semesterNum;

    @Column(name = "CREDIT")
    private int credit;

    @Column(name = "QUOTA")
    private int quota;

    @Column(name = "AKTS")
    private int akts;

    @Column(name = "DEPARTMENT")
    private String department;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "studentLectureId.lecture", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<StudentLecture> students = new HashSet<StudentLecture>(0);

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "LECTURE_LECTURER", joinColumns = {@JoinColumn(name = "LECTURE_ID", referencedColumnName = "ID")},
               inverseJoinColumns = {@JoinColumn(name = "LECTURER_ID", referencedColumnName = "ID")})
    @JsonManagedReference
    private Lecturer lecturer;


    public String getDepartment() {

        return department;
    }


    public void setDepartment(String department) {

        this.department = department;
    }


    public long getId() {

        return id;
    }


    public void setId(long id) {

        this.id = id;
    }


    public String getCode() {

        return code;
    }


    public void setCode(String code) {

        this.code = code;
    }


    public String getName() {

        return name;
    }


    public void setName(String name) {

        this.name = name;
    }


    public Date getRegDate() {

        return regDate;
    }


    public void setRegDate(Date regDate) {

        this.regDate = regDate;
    }


    public boolean isActive() {

        return active;
    }


    public void setActive(boolean active) {

        this.active = active;
    }


    public int getSemesterNum() {

        return semesterNum;
    }


    public void setSemesterNum(int semesterNum) {

        this.semesterNum = semesterNum;
    }


    public int getCredit() {

        return credit;
    }


    public void setCredit(int credit) {

        this.credit = credit;
    }


    public int getQuota() {

        return quota;
    }


    public void setQuota(int quota) {

        this.quota = quota;
    }


    public int getAkts() {

        return akts;
    }


    public void setAkts(int akts) {

        this.akts = akts;
    }


    public Set<StudentLecture> getStudents() {

        return students;
    }


    public void setStudents(Set<StudentLecture> students) {

        this.students = students;
    }


    public Lecturer getLecturer() {

        return lecturer;
    }


    public void setLecturer(Lecturer lecturer) {

        this.lecturer = lecturer;
    }


    public void removeLecturer() {

        this.lecturer = null;
    }


    public boolean addStudent(StudentLecture studentLecture) {

        return this.students.add(studentLecture);
    }


    public boolean removeStudent(StudentLecture studentLecture) {

        return this.students.remove(studentLecture);
    }


    @PrePersist
    public void onPrePersist() {

        this.setActive(true);
        this.setRegDate(new Date());
    }


    @PreRemove
    public void onPreRemove() {

        this.setActive(false);
    }
}
