package com.example.be.repository;

import com.example.be.entity.GiaoVien;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GiaoVienRepository extends JpaRepository<GiaoVien, Integer> {
    Optional<GiaoVien> findByUsername(String username);
    Boolean existsByUsername(String username);
}
