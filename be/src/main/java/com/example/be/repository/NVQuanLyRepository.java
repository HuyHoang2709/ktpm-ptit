package com.example.be.repository;

import com.example.be.entity.NVQuanLy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NVQuanLyRepository extends JpaRepository<NVQuanLy, Integer> {
    Optional<NVQuanLy> findByUsername(String username);
    Boolean existsByUsername(String username);
}
