package com.sezgin.oguzhan.graduation.model;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LectureDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter valid code")
    private String code;

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter valid name")
    private String name;

    @Min(value = 1, message = "Enter valid semester")
    private int semesterNum;

    @Min(value = 1, message = "Enter valid credit")
    private int credit;

    @Min(value = 1, message = "Enter valid quota")
    private int quota;

    @Min(value = 1, message = "Enter valid akts")
    private int akts;

    private String department;


    public String getDepartment() {

        return department;
    }


    public void setDepartment(String department) {

        this.department = department;
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
}

