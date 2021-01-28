package com.sezgin.oguzhan.graduation.model;

import javax.validation.constraints.NotNull;

public class StudentUpdateDTO {



    private String department;

    private String address;

    private String city;

    private String district;

    private long postCode;

    private String phoneNum1;

    private String phoneNum2;

    private String eMail1;

    private String eMail2;

    private String webPage;


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


    public String getDepartment() {

        return department;
    }


    public void setDepartment(String department) {

        this.department = department;
    }


}
