package com.sezgin.oguzhan.graduation.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AnnouncementDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Please enter valid Announcement")
    private String announcement;


    public String getAnnouncement() {

        return announcement;
    }


    public void setAnnouncement(String announcement) {

        this.announcement = announcement;
    }
}
