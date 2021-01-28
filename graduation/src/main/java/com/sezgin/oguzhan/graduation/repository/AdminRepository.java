package com.sezgin.oguzhan.graduation.repository;

import com.sezgin.oguzhan.graduation.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Override
    Optional<Admin> findById(Long id);

    Optional<Admin> findByUsername(String username);

    List<Admin> findByActiveTrue();
}
