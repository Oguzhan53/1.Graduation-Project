package com.sezgin.oguzhan.graduation.service;

import com.sezgin.oguzhan.graduation.entity.Admin;
import com.sezgin.oguzhan.graduation.entity.Announcement;
import com.sezgin.oguzhan.graduation.entity.Lecturer;
import com.sezgin.oguzhan.graduation.entity.Student;
import com.sezgin.oguzhan.graduation.model.AnnouncementDTO;
import com.sezgin.oguzhan.graduation.model.MyUserDeatils;
import com.sezgin.oguzhan.graduation.model.UserDTO;
import com.sezgin.oguzhan.graduation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AdminService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AnnouncementRepository announcementRepository;


    @Bean
    public BCryptPasswordEncoder encode() {

        return new BCryptPasswordEncoder();
    }


    public Admin saveAdmin(UserDTO userDTO) {

        Admin admin = new Admin();
        admin.setName(userDTO.getName());
        admin.setSurname(userDTO.getSurname());
        admin.setUsername(userDTO.getUsername());
        admin.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        admin.setRole(roleRepository.findByName("ROLE_ADMIN"));
        return adminRepository.save(admin);
    }


    public Announcement addAnnouncement(AnnouncementDTO announcementDTO, long stuId) {

        Optional<Student> optionalStudent = studentRepository.findById(stuId);
        if(optionalStudent.isPresent()) {
            Announcement announcement = new Announcement();
            announcement.setAnnouncement(announcementDTO.getAnnouncement());
            announcement.addStudent(optionalStudent.get());
            return announcementRepository.save(announcement);
        }
        throw new NoSuchElementException("There is no student with this id");
    }

    public Announcement addAnnouncementToAll(AnnouncementDTO announcementDTO) {

        List<Student> students=studentRepository.findByActiveTrue();
        Announcement announcement = new Announcement();
        announcement.setAnnouncement(announcementDTO.getAnnouncement());
        for(Student st : students) {
            announcement.addStudent(st);
        }
        return announcementRepository.save(announcement);

    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Admin> optionalAdmin = adminRepository.findByUsername(username);
        if(optionalAdmin.isPresent()) {
            return new MyUserDeatils(optionalAdmin.get());
        }
        Optional<Student> optionalStudent = studentRepository.findByUsername(username);

        if(optionalStudent.isPresent()) {
            return new MyUserDeatils(optionalStudent.get());
        }

        Optional<Lecturer> optionalLecturer = lecturerRepository.findByUsername(username);
        if(optionalLecturer.isPresent()) {
            return new MyUserDeatils(optionalLecturer.get());
        }

        throw new UsernameNotFoundException("User can not found");
    }
}
