package com.sezgin.oguzhan.graduation.repository;

import com.sezgin.oguzhan.graduation.entity.Lecture;
import com.sezgin.oguzhan.graduation.entity.Lecturer;
import com.sezgin.oguzhan.graduation.entity.StudentLecture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentLectureRepository extends JpaRepository<StudentLecture, Long> {

    Optional<StudentLecture> findById(Long id);

    List<StudentLecture> findAll();

    List<StudentLecture> findByConfirmation(String confirmation);
}
