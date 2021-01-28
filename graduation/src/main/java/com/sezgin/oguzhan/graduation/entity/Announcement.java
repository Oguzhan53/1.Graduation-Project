package com.sezgin.oguzhan.graduation.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ANNOUNCEMENTS")
public class Announcement {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "STUDENT_ANNOUNCEMENTS",
               joinColumns = {@JoinColumn(name = "STUDENT_ID", referencedColumnName = "ID")},
               inverseJoinColumns = {@JoinColumn(name = "ANNOUNCEMENT_ID", referencedColumnName = "ID")})
    List<Student> students = new ArrayList<>();

    @Column(name = "DATE")
    private Date createData;

    @Column(name = "ANNOUNCEMENT")
    private String announcement;


    public long getId() {

        return id;
    }


    public void setId(long id) {

        this.id = id;
    }


    public void addStudent(Student student) {

        students.add(student);
    }


    public List<Student> getStudents() {

        return students;
    }


    public void setStudents(List<Student> students) {

        this.students = students;
    }


    public Date getCreateData() {

        return createData;
    }


    public void setCreateData(Date createData) {

        this.createData = createData;
    }


    public String getAnnouncement() {

        return announcement;
    }


    public void setAnnouncement(String announcement) {

        this.announcement = announcement;
    }


    @PrePersist
    public void onPrePersist() {

        this.setCreateData(new Date());
    }
}
