package com.sezgin.oguzhan.graduation.model;

import com.sezgin.oguzhan.graduation.entity.Role;
import com.sezgin.oguzhan.graduation.entity.UserEntityBase;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class MyUserDeatils implements UserDetails {

    private UserEntityBase user;


    public MyUserDeatils(UserEntityBase user) {

        this.user = user;
    }


    public Role getUserRole() {

        return this.user.getRole();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        String role = user.getRole().getName();
        list.add(new SimpleGrantedAuthority(role));
        return list;
    }


    @Override
    public String getPassword() {

        return user.getPassword();
    }


    @Override
    public String getUsername() {

        return user.getUsername();
    }


    @Override
    public boolean isAccountNonExpired() {

        return user.isActive();
    }


    @Override
    public boolean isAccountNonLocked() {

        return user.isActive();
    }


    @Override
    public boolean isCredentialsNonExpired() {

        return user.isActive();
    }


    @Override
    public boolean isEnabled() {

        return user.isActive();
    }
}
