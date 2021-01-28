package com.sezgin.oguzhan.graduation.repository;

import com.sezgin.oguzhan.graduation.entity.Lecturer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, Long> {

    @Override
    Optional<Lecturer> findById(Long id);

    Page<Lecturer> findById(Long id, Pageable pageable);

    Page<Lecturer> findByActiveTrue(Pageable pageable);

    Page<Lecturer> findByDepartmentAndActiveTrue(String department, Pageable pageable);



    Optional<Lecturer> findByUsername(String username);

    Page<Lecturer> findByNameAndActiveTrue(String name, Pageable pageable);
}
