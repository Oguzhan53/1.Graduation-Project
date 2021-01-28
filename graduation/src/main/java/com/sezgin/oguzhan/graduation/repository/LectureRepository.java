package com.sezgin.oguzhan.graduation.repository;

import com.sezgin.oguzhan.graduation.entity.Lecture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Long> {

    Optional<Lecture> findById(Long id);

    Page<Lecture> findById(Long id, Pageable pageable);

    Page<Lecture> findByActiveTrue(Pageable pageable);

    Optional<Lecture> findByCode(String code);

    Page<Lecture> findByCodeAndActiveTrue(String code, Pageable pageable);

    Page<Lecture> findByLecturerNullAndActiveTrue(Pageable pageable);
}
