package com.sezgin.oguzhan.graduation.service;

import com.sezgin.oguzhan.graduation.entity.Lecture;
import com.sezgin.oguzhan.graduation.entity.Lecturer;
import com.sezgin.oguzhan.graduation.entity.Student;
import com.sezgin.oguzhan.graduation.entity.StudentLecture;
import com.sezgin.oguzhan.graduation.model.LecturerDTO;
import com.sezgin.oguzhan.graduation.model.MyUserDeatils;
import com.sezgin.oguzhan.graduation.repository.*;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LecturerService implements UserDetailsService {

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private StudentLectureRepository studentLectureRepository;

    @Autowired
    private StudentRepository studentRepository;


    public Lecturer save(LecturerDTO lecturerDTO) {

        Lecturer lecturer = new Lecturer();
        lecturer.setUsername(lecturerDTO.getUsername());
        lecturer.setPassword(passwordEncoder.encode(lecturerDTO.getPassword()));
        lecturer.setName(lecturerDTO.getName());
        lecturer.setSurname(lecturerDTO.getSurname());
        lecturer.setDepartment(lecturerDTO.getDepartment());
        lecturer.setRole(roleRepository.findByName("ROLE_LECTURER"));
        return lecturerRepository.save(lecturer);
    }


    public Lecturer addLecture(Long id, String code) throws IllegalAccessException, DuplicateMemberException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(id);
        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);
        if(optionalLecturer.isPresent() && optionalLecture.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            Lecture lecture = optionalLecture.get();
            if(lecturer.addLecture(lecture)) {
                return lecturerRepository.save(lecturer);
            }
            throw new DuplicateMemberException("Course already added");
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    public Lecturer removeLecture(Long id, String code) throws IllegalAccessException, DuplicateMemberException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(id);
        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);
        if(optionalLecturer.isPresent() && optionalLecture.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            Lecture lecture = optionalLecture.get();
            if(lecturer.removeLecture(lecture)) {
                return lecturerRepository.save(lecturer);
            }
            throw new DuplicateMemberException("Course already added");
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    public List<Lecture> getLecture(String username) throws IllegalAccessException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findByUsername(username);
        if(optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            return lecturer.getLectures();
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    public List<Student> getStudens(String username) throws IllegalAccessException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findByUsername(username);
        if(optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            return lecturer.getStudents();
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    public Page<Lecturer> getByDepartment(String department, int pageSize, int pageNumber) {

        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return lecturerRepository.findByDepartmentAndActiveTrue(department, paged);
    }


    public List<Student> getStudensById(long id) throws IllegalAccessException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(id);
        if(optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            return lecturer.getStudents();
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    public Page<Lecturer> findActive(int pageSize, int pageNumber) {

        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return lecturerRepository.findByActiveTrue(paged);
    }


    public Optional<Lecturer> findById(long id) throws IllegalAccessException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(id);
        if(optionalLecturer.isPresent()) {
            return optionalLecturer;
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    public List<Student> getWaiting(String username) throws IllegalAccessException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findByUsername(username);
        if(optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            List<StudentLecture> studentLectures =
                    studentLectureRepository.findByConfirmation("WAITING");
            List<Student> temp = new ArrayList<>();
            for(StudentLecture st : studentLectures) {
                if(st.getStudent().getLecturer() == lecturer && !temp.contains(st.getStudent())) {
                    temp.add(st.getStudent());
                }
            }
            return temp;
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    public Page<Lecturer> findByIdPage(long id) throws IllegalAccessException {

        Pageable paged = PageRequest.of(0, 4);
        return lecturerRepository.findById(id, paged);
    }


    public Page<Lecturer> findByNamePage(String name, int pageSize, int pageNumber) throws IllegalAccessException {

        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return lecturerRepository.findByNameAndActiveTrue(name, paged);
    }


    public Lecturer delete(long id) throws IllegalAccessException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(id);
        if(optionalLecturer.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            for(Lecture lec : lecturer.getLectures()) {
                lec.setLecturer(null);
                lectureRepository.save(lec);
            }
            for(Student st : lecturer.getStudents()) {
                st.setLecturer(null);
                studentRepository.save(st);
            }
            lecturer.setStudents(null);
            lecturer.setLectures(null);
            lecturer.setActive(!lecturer.isActive());
            return lecturerRepository.save(lecturer);
        }
        throw new IllegalAccessException("Lecturer not found");
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findByUsername(username);
        if(optionalLecturer.isPresent()) {
            return new MyUserDeatils(optionalLecturer.get());
        }
        throw new UsernameNotFoundException("User can not found");
    }
}
