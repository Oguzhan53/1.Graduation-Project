package com.sezgin.oguzhan.graduation.repository;

import com.sezgin.oguzhan.graduation.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Override
    Optional<Student> findById(Long id);

    Page<Student> findById(Long id, Pageable pageable);

    Page<Student> findByActiveTrue(Pageable pageable);

    List<Student> findByActiveTrue();

    Optional<Student> findByUsername(String username);

    Page<Student> findByDepartmentAndLecturerNullAndActiveTrue(String Department, Pageable pageable);

    Page<Student> findByNumberAndActiveTrue(Long number, Pageable pageable);

    Page<Student> findByLecturerNullAndActiveTrue(Pageable pageable);
}
