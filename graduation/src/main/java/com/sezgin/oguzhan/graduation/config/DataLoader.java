package com.sezgin.oguzhan.graduation.config;

import com.sezgin.oguzhan.graduation.entity.Admin;
import com.sezgin.oguzhan.graduation.entity.Role;
import com.sezgin.oguzhan.graduation.repository.AdminRepository;
import com.sezgin.oguzhan.graduation.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AdminRepository adminRepository;



    @Override
    public void run(ApplicationArguments args) throws Exception {

        boolean lecturerRoleExist = roleRepository.existsByName("ROLE_LECTURER");
        if(!lecturerRoleExist) {
            Role lectureRole = new Role();
            lectureRole.setName("ROLE_LECTURER");
            roleRepository.save(lectureRole);
        }
        boolean studentRoleExist = roleRepository.existsByName("ROLE_STUDENT");
        if(!studentRoleExist) {
            Role studentRole = new Role();
            studentRole.setName("ROLE_STUDENT");
            roleRepository.save(studentRole);
        }

        boolean adminRoleExist = roleRepository.existsByName("ROLE_ADMIN");
        if(!adminRoleExist) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }




    }
}
