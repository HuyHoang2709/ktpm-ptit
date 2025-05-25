package com.example.be.repository;

import com.example.be.entity.NVQuanLy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NVQuanLyRepository extends JpaRepository<NVQuanLy, Integer> {
    Optional<NVQuanLy> findByUsername(String username);
    Boolean existsByUsername(String username);
}
