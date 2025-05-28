package com.example.be.repository;

import com.example.be.entity.DangKyDay;
import com.example.be.entity.GiaoVien;
import com.example.be.entity.LopHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DangKyDayRepository extends JpaRepository<DangKyDay, Integer> {
    Optional<DangKyDay> findByGiaovienAndLophoc(GiaoVien giaovien, LopHoc lophoc);
    List<DangKyDay> findDangKyDaysByGiaovien(GiaoVien giaovien);
    List<DangKyDay> findDangKyDaysByLophoc(LopHoc lophoc);
}
