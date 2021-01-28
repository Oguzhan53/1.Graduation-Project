package com.sezgin.oguzhan.graduation.service;

import com.sezgin.oguzhan.graduation.entity.Lecture;

import com.sezgin.oguzhan.graduation.entity.Lecturer;
import com.sezgin.oguzhan.graduation.entity.StudentLecture;
import com.sezgin.oguzhan.graduation.model.LectureDTO;
import com.sezgin.oguzhan.graduation.model.LectureResultDTO;
import com.sezgin.oguzhan.graduation.repository.LectureRepository;
import com.sezgin.oguzhan.graduation.repository.LecturerRepository;
import com.sezgin.oguzhan.graduation.repository.StudentLectureRepository;
import com.sezgin.oguzhan.graduation.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
public class LectureService {

    @Autowired
    private LecturerRepository lecturerRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    public StudentLectureRepository studentLectureRepository;


    public Lecture save(LectureDTO lectureDTO) {

        Lecture lecture = new Lecture();
        lecture.setCode(lectureDTO.getCode());
        lecture.setName(lectureDTO.getName());
        lecture.setSemesterNum(lectureDTO.getSemesterNum());
        lecture.setCredit(lectureDTO.getCredit());
        lecture.setQuota(lectureDTO.getQuota());
        lecture.setAkts(lectureDTO.getAkts());
        lecture.setDepartment(lectureDTO.getDepartment());
        return lectureRepository.save(lecture);
    }


    public Lecture assignLecturer(Long id, String code) throws NoSuchElementException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(id);
        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);
        if(optionalLecturer.isPresent() && optionalLecture.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            Lecture lecture = optionalLecture.get();
            lecture.setLecturer(lecturer);
            return lectureRepository.save(lecture);
        }
        throw new NoSuchElementException("Lecturer not found");
    }


    public Lecture removeLecturer(Long id, String code) throws NoSuchElementException {

        Optional<Lecturer> optionalLecturer = lecturerRepository.findById(id);
        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);
        if(optionalLecturer.isPresent() && optionalLecture.isPresent()) {
            Lecturer lecturer = optionalLecturer.get();
            Lecture lecture = optionalLecture.get();
            lecture.setLecturer(null);
            return lectureRepository.save(lecture);
        }
        throw new NoSuchElementException("Lecturer not found");
    }


    public Set<StudentLecture> getStudents(String code) throws NoSuchElementException {

        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);
        if(optionalLecture.isPresent()) {
            Lecture lecture = optionalLecture.get();
            return lecture.getStudents();
        }
        throw new NoSuchElementException("There is lecture with this code ");
    }


    public Page<Lecture> getByLecNull(int pageSize, int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return lectureRepository.findByLecturerNullAndActiveTrue(pageable);
    }


    public double calculateResults(LectureResultDTO lectureResultDTO, String code) throws NoSuchElementException{

        double mid1Per = lectureResultDTO.getMid1Per();
        double mid2Per = lectureResultDTO.getMid2Per();
        double finalPer = lectureResultDTO.getFinalPer();
        double passGrade = lectureResultDTO.getPassGrade();
        double lecaverage = (lectureResultDTO.getMid1Av() * mid1Per / 100) +
                (lectureResultDTO.getMid2Av() * mid2Per / 100) +
                (lectureResultDTO.getFinalAv() * finalPer / 100);

        double standartDev = 0;
        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);

        if(optionalLecture.isPresent()) {
            int stNum = 0;
            Lecture lecture = optionalLecture.get();
            double stAv = 0;
            for(StudentLecture st : lecture.getStudents()) {
                stAv = (st.getMidterm1() * mid1Per / 100) + (st.getMidterm2() * mid2Per / 100) +
                        (st.getFinalGrade() * finalPer / 100);
                standartDev += Math.pow(stAv - lecaverage, 2);
                stNum++;
            }
            standartDev = Math.sqrt(standartDev / stNum);
            for(StudentLecture st : lecture.getStudents()) {
                stAv = (st.getMidterm1() * mid1Per / 100) + (st.getMidterm2() * mid2Per / 100) +
                        (st.getFinalGrade() * finalPer / 100);
                if(stAv >= passGrade && stAv < passGrade + standartDev) {
                    st.setLetterGrade("CC");
                } else if(stAv >= (passGrade + standartDev) && stAv < (passGrade + (2 * standartDev))) {
                    st.setLetterGrade("CB");
                } else if(stAv >= (passGrade + (2 * standartDev)) && stAv < (passGrade + (3 * standartDev))) {
                    st.setLetterGrade("BB");
                } else if(stAv >= (passGrade + (3 * standartDev)) && stAv < (passGrade + (4 * standartDev))) {
                    st.setLetterGrade("BA");
                } else if(stAv >= (passGrade + (4 * standartDev))) {
                    st.setLetterGrade("AA");
                } else if(stAv >= (passGrade - standartDev) && stAv < passGrade) {
                    st.setLetterGrade("DC");
                } else if(stAv >= (passGrade - (2 * standartDev)) && stAv < (passGrade - standartDev)) {
                    st.setLetterGrade("DD");
                } else {
                    st.setLetterGrade("FF");
                }
                studentLectureRepository.save(st);
            }
            return stAv;
        }
        throw new NoSuchElementException("There is no lecture with this code");
    }


    public double getAverage(String code, int exNum) throws NoSuchElementException {

        Optional<Lecture> optionalLecture = lectureRepository.findByCode(code);
        if(optionalLecture.isPresent()) {
            Lecture lecture = optionalLecture.get();
            double avrg = 0;
            for(StudentLecture st : lecture.getStudents()) {
                if(exNum == 1) {
                    avrg += st.getMidterm1();
                } else if(exNum == 2) {
                    avrg += st.getMidterm2();
                } else {
                    avrg += st.getFinalGrade();
                }
            }
            return avrg / (double) lecture.getStudents().size();
        }
        throw new NoSuchElementException("There is no lecture with this code");
    }


    public List<StudentLecture> setGrades(String code, int grade1, int grade2, int grade3, int number) {

        Set<StudentLecture> students = getStudents(code);

        for(StudentLecture st : students) {
            if(number == st.getStudent().getNumber()) {
                if(grade1 != 0) {
                    st.setMidterm1(grade1);
                }
                if(grade2 != 0) {
                    st.setMidterm2(grade2);
                }
                if(grade3 != 0) {
                    st.setFinalGrade(grade3);
                }

                studentLectureRepository.save(st);
            }
        }

        return studentLectureRepository.findAll();
    }


    public Page<Lecture> findActive(int pageSize, int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return lectureRepository.findByActiveTrue(pageable);
    }


    public Optional<Lecture> findById(long id) throws NoSuchElementException {

        Optional<Lecture> optionalLecture = lectureRepository.findById(id);
        if(optionalLecture.isPresent()) {
            return optionalLecture;
        }
        throw new NoSuchElementException("There is no this name lecture");
    }


    public Page<Lecture> findByIdPage(long id) throws NoSuchElementException {

        Pageable pageable = PageRequest.of(0, 4);
        return lectureRepository.findById(id, pageable);
    }


    public Page<Lecture> findByCodePage(String code) throws NoSuchElementException {

        Pageable pageable = PageRequest.of(0, 4);
        return lectureRepository.findByCodeAndActiveTrue(code, pageable);
    }


    public Lecture delete(long id) throws NoSuchElementException {

        Optional<Lecture> optionalLecture = lectureRepository.findById(id);
        if(optionalLecture.isPresent()) {
            Lecture lecture = optionalLecture.get();
            lecture.setLecturer(null);
            lecture.setStudents(null);
            lecture.setActive(!lecture.isActive());

            return lectureRepository.save(lecture);
        }
        throw new NoSuchElementException("Lecture not found");
    }
}
