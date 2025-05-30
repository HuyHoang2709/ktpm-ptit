package com.example.be.repository;

import com.example.be.entity.DangKyDay;
import com.example.be.entity.GiaoVien;
import com.example.be.entity.LopHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DangKyDayRepository extends JpaRepository<DangKyDay, Integer> {
    List<DangKyDay> findDangKyDaysByGiaovien(GiaoVien giaovien);
    List<DangKyDay> findDangKyDaysByLophoc(LopHoc lophoc);
}
