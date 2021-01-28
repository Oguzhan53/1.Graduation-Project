package com.sezgin.oguzhan.graduation.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserDTO {


    @NotBlank
    @Email
    @Size(max = 255 , min = 3 , message = "Please enter valid username")
    private String username;

    @NotBlank
    @Size(max = 255 , min = 3 , message = "Please enter valid password")
    private String password;

    private String name;

    private String surname;



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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


}
