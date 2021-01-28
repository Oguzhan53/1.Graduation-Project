package com.sezgin.oguzhan.graduation.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ROLE")
public class Role {


    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NAME", unique = true)
    private String name;

    @OneToMany(mappedBy = "role")
    @JsonBackReference
    private List<UserEntityBase> users;


    public String getName() {

        return name;
    }


    public void setName(String name) {

        this.name = name;
    }


    public List<UserEntityBase> getUsers() {

        return users;
    }


    public void setUsers(List<UserEntityBase> users) {

        this.users = users;
    }
}
