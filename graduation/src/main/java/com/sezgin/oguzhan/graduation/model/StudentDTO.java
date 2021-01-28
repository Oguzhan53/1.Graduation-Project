package com.sezgin.oguzhan.graduation.model;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class StudentDTO extends UserDTO {

    private int classNum;

    @NotNull
    private Long number;

    private String department;


    public String getDepartment() {

        return department;
    }


    public void setDepartment(String department) {

        this.department = department;
    }


    public Long getNumber() {

        return number;
    }


    public void setNumber(Long number) {

        this.number = number;
    }


    public int getClassNum() {

        return classNum;
    }


    public void setClassNum(int classNum) {

        this.classNum = classNum;
    }
}
