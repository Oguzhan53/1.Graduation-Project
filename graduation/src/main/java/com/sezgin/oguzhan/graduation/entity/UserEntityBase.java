package com.sezgin.oguzhan.graduation.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "USER_TYPE")
public abstract class UserEntityBase {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SURNAME")
    private String surname;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "USER_NAME", unique = true)
    private String username;

    @Column(name = "DATA_OF_REGISTRATION")
    private Date regDate;

    @Column(name = "ACTIVE")
    private boolean active;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "ROLES", joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
               inverseJoinColumns = {@JoinColumn(name = "ROLE_ID", referencedColumnName = "ID")})
    @JsonManagedReference
    protected Role role;


    public Role getRole() {

        return role;
    }


    public void setRole(Role role) {

        this.role = role;
    }


    public boolean isActive() {

        return active;
    }


    public void setActive(boolean active) {

        this.active = active;
    }


    public long getId() {

        return id;
    }


    public void setId(long id) {

        this.id = id;
    }


    public String getName() {

        return name;
    }


    public void setName(String name) {

        this.name = name;
    }


    public String getSurname() {

        return surname;
    }


    public void setSurname(String surname) {

        this.surname = surname;
    }


    public String getPassword() {

        return password;
    }


    public void setPassword(String password) {

        this.password = password;
    }


    public String getUsername() {

        return username;
    }


    public void setUsername(String username) {

        this.username = username;
    }


    public void setRegDate(Date regDate) {

        this.regDate = regDate;
    }


    public Date getRegDate() {

        return regDate;
    }


    @PrePersist
    public void onPrePersist() {

        this.setActive(true);
        this.setRegDate(new Date());
    }


    @PreUpdate
    public void onPreUpdate() {

        this.setRegDate(new Date());
    }


    @PreRemove
    public void onPreRemove() {

        this.setActive(false);
    }
}
