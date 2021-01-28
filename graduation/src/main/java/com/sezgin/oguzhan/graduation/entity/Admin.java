package com.sezgin.oguzhan.graduation.entity;

import javax.persistence.*;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends UserEntityBase {

}
