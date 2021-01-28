package com.sezgin.oguzhan.graduation.service;

import com.sezgin.oguzhan.graduation.entity.*;
import com.sezgin.oguzhan.graduation.model.MyUserDeatils;
import com.sezgin.oguzhan.graduation.model.StudentDTO;
import com.sezgin.oguzhan.graduation.model.StudentUpdateDTO;
import com.sezgin.oguzhan.graduation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class StudentService implements UserDetailsService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder3;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private StudentLectureRepository studentLectureRepository;

    @Autowired
    private AnnouncementRepository announcementRepository;


    public Student save(StudentDTO studentDTO) {

        Student student = new Student();
        student.setUsername(studentDTO.getUsername());
        student.setPassword(passwordEncoder3.encode(studentDTO.getPassword()));
        student.setName(studentDTO.getName());
        student.setSurname(studentDTO.getSurname());
        student.setNumber(studentDTO.getNumber());
        student.setClassNum(studentDTO.getClassNum());
        student.setDepartment(studentDTO.getDepartment());
        student.setRole(roleRepository.findByName("ROLE_STUDENT"));
        return studentRepository.save(student);
    }


    public Student updateInfo(StudentUpdateDTO studentDTO, String username) {

        Optional<Student> optionalStudent = studentRepository.findByUsername(username);
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setAddress(studentDTO.getAddress());
            student.setCity(studentDTO.getCity());
            student.setDistrict(studentDTO.getDistrict());
            student.setPostCode(studentDTO.getPostCode());
            student.setPhoneNum1(studentDTO.getPhoneNum1());
            student.setPhoneNum2(studentDTO.getPhoneNum2());
            student.seteMail1(studentDTO.geteMail1());
            student.seteMail2(studentDTO.geteMail2());
            student.setWebPage(studentDTO.getWebPage());
            return studentRepository.save(student);
        }

        throw new NoSuchElementException("Wrong id");
    }


    public void saveBoot(long num) {

        for(int i = 0; i < 5000; i++) {
            Student student = new Student();
            String name = "name";
            name += num;
            student.setName(name);
            //student.setPassword(passwordEncoder3.encode(name));
            student.setPassword(name);
            student.setSurname(name);
            student.setDepartment("Computer");
            student.setNumber(num + 1000);
            student.setUsername(name + "@mail.com");
            student.setClassNum(2);
            student.setRole(roleRepository.findByName("ROLE_STUDENT"));
            studentRepository.save(student);
            System.out.println("num: " + num);
            num++;
        }
    }

    public Student getMe(String username){
        return studentRepository.findByUsername(username).get();
    }


    public List<Announcement> seeAnnoucement(String username) {

        Optional<Student> optionalStudent = studentRepository.findByUsername(username);
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            return student.getAnnouncements();
        }
        throw new NoSuchElementException("There is no user with this number");
    }


    public Page<Student> getNullAdvisor(int pageSize, int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return studentRepository.findByLecturerNullAndActiveTrue(pageable);
    }


    public Page<Student> findAll(int pageSize, int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return studentRepository.findByActiveTrue(pageable);
    }


    public Page<Student> findByIdPageable(long id) throws NoSuchElementException {

        Pageable pageable = PageRequest.of(0, 4);
        return studentRepository.findById(id, pageable);
    }


    public Optional<Student> findById(long id) throws NoSuchElementException {

        Optional<Student> studentOptional = studentRepository.findById(id);
        if(studentOptional.isPresent()) {
            return studentOptional;
        }
        throw new NoSuchElementException("There is no user with this number");
    }


    public Page<Student> findByNumber(long number) throws NoSuchElementException {

        Pageable pageable = PageRequest.of(0, 4);
        return studentRepository.findByNumberAndActiveTrue(number, pageable);
    }


    public Student delete(long id) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findById(id);
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setActive(!student.isActive());
            return studentRepository.save(student);
        }
        throw new NoSuchElementException("Student not found");
    }


    public Student setAdvisor(long lecId, long stuId) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findById(stuId);
        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(lecId);
        if(optionalLecturer.isPresent() && optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            Lecturer lecturer = optionalLecturer.get();
            student.setLecturer(lecturer);
            lecturer.setStuNum(lecturer.getStuNum()+1);
            lecturerRepository.save(lecturer);
            return studentRepository.save(student);
        }
        throw new NoSuchElementException("Wrong id");
    }


    public Student removeAdvisor(long stuId) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findById(stuId);
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            Lecturer lecturer = student.getLecturer();
            if(lecturer==null)
                throw new NoSuchElementException("There is no advisor");
            student.removeLecturer();
            lecturer.setStuNum(lecturer.getStuNum()-1);
            lecturerRepository.save(lecturer);
            return studentRepository.save(student);
        }
        throw new NoSuchElementException("Wrong id");
    }


    public Set<StudentLecture> getLectures(String username) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findByUsername(username);
        // Optional<Student> optionalStudent = studentRepository.findById(id);
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
//            Set<StudentLecture> temp = new HashSet<>();
//            temp.addAll(student.getLectures());
//            int size = student.getLectures().size();
//            int i = 0;
//            while(i < size) {
//                for(StudentLecture st : student.getLectures()) {
//                    if(st.getConfirmation().equals("DENIED")) {
//                        removeLecture(username, st.getLecture().getCode());
//                        break;
//                    }
//                }
//                i++;
//            }

            return student.getLectures();
        }
        throw new NoSuchElementException("There is no user with this number");
    }


    public Set<StudentLecture> getWaitingLectures(String username) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findByUsername(username);
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            Set<StudentLecture> temp = new HashSet<>();
            for(StudentLecture st : student.getLectures()) {
                if("WAITING".equals(st.getConfirmation())) {
                    temp.add(st);
                }
            }
            return temp;
            // return student.getWaitingLectures();
        }
        throw new NoSuchElementException("There is no user with this number");
    }


    public String setConfirm(long id, String code, int decide) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findById(id);
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            for(StudentLecture stl : student.getLectures()) {
                if(stl.getLecture().getCode().equals(code)) {
                    Announcement announcement = new Announcement();



                    if(decide == 0) {
                        stl.setConfirmation("DENIED");
                        announcement.setAnnouncement(stl.getLecture().getName()+" lecture is denied");
                        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);
                        if(optionalLecture.isPresent()) {

                            Lecture lecture = optionalLecture.get();
                            for(StudentLecture st : student.getLectures()) {
                                if(st.getLecture().getCode().equals(code)) {
                                    student.removeLecture(st);
                                    lecture.removeStudent(st);
                                    lecture.setQuota(lecture.getQuota() + 1);
                                    student.setCredit(student.getCredit() + lecture.getCredit());
                                    studentRepository.save(student);
                                    lectureRepository.save(lecture);
                                    studentLectureRepository.delete(st);
                                    announcement.addStudent(optionalStudent.get());
                                    announcementRepository.save(announcement);
                                    return student.getUsername();
                                }
                            }
                        }
                    }
                    else {
                        stl.setConfirmation("ACCEPTED");
                        announcement.setAnnouncement(stl.getLecture().getName()+" lecture is accepted");
                        announcement.addStudent(optionalStudent.get());
                        announcementRepository.save(announcement);
                    }

                    return student.getUsername();
                }
            }
        }

        throw new NoSuchElementException("This student is not taking a lecture with such code");
    }


    public Set<StudentLecture> addLecture(String username, String lectureCode) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findByUsername(username);
        //Optional<Student> optionalStudent = studentRepository.findById(id);
        Optional<Lecture> optionalLecture = lectureRepository.findByCode(lectureCode);
        if(optionalLecture.isPresent() && optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            Lecture lecture = optionalLecture.get();
            for(StudentLecture st : student.getLectures()) {
                if(st.getLecture() == lecture) {
                    throw new IndexOutOfBoundsException("Lecture already added");
                }
            }
            if(student.getCredit() < lecture.getCredit()) {
                throw new IndexOutOfBoundsException("Credit is over");
            }
            if(lecture.getQuota()==0){
                throw new IndexOutOfBoundsException("Lecture Quota is full");
            }
            lecture.setQuota(lecture.getQuota() - 1);
            student.setCredit(student.getCredit() - lecture.getCredit());
            StudentLecture studentLecture = new StudentLecture();
            studentLecture.setLecture(lecture);
            studentLecture.setStudent(student);
            studentLectureRepository.save(studentLecture);
            return student.getLectures();
        }
        throw new NoSuchElementException("Wrong id");
    }


    public List<StudentLecture> getLectures() {

        List<StudentLecture> st = studentLectureRepository.findAll();
        return st;
    }


    public Set<StudentLecture> removeLecture(String username, String lectureCode) throws NoSuchElementException {

        Optional<Student> optionalStudent = studentRepository.findByUsername(username);
        //Optional<Student> optionalStudent = studentRepository.findById(id);
        Optional<Lecture> optionalLecture = lectureRepository.findByCode(lectureCode);
        if(optionalStudent.isPresent() && optionalLecture.isPresent()) {
            Student student = optionalStudent.get();
            Lecture lecture = optionalLecture.get();
            for(StudentLecture st : student.getLectures()) {
                if(st.getLecture().getCode().equals(lectureCode)) {
                    student.removeLecture(st);
                    lecture.removeStudent(st);
                    lecture.setQuota(lecture.getQuota() + 1);
                    student.setCredit(student.getCredit() + lecture.getCredit());
                    studentRepository.save(student);
                    lectureRepository.save(lecture);
                    studentLectureRepository.delete(st);
                    return student.getLectures();
                }
            }
        }
        throw new NoSuchElementException("Wrong id");
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Student> optionalStudent = studentRepository.findByUsername(username);
        if(optionalStudent.isPresent()) {
            return new MyUserDeatils(optionalStudent.get());
        }
        throw new UsernameNotFoundException("User can not found");
    }
}
