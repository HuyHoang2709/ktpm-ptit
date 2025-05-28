package com.example.be.repository;

import com.example.be.entity.BuoiHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuoiHocRepository extends JpaRepository<BuoiHoc, Integer> {
}
