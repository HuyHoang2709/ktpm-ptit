package com.example.be.service;

import com.example.be.entity.BuoiHoc;
import com.example.be.entity.GiaoVien;
import com.example.be.entity.LichDay;
import com.example.be.repository.BuoiHocRepository;
import com.example.be.repository.GiaoVienRepository;
import com.example.be.repository.LichDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class LenLichDayService {
    @Autowired
    private GiaoVienRepository gvRepo;

    @Autowired
    private BuoiHocRepository bhRepo;

    @Autowired
    private LichDayRepository ldRepo;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public boolean existGiaoVien(GiaoVien gv) {
        return gvRepo.existsById(gv.getId());
    }

    public List<BuoiHoc> findAllBuoiHoc() {
        return bhRepo.findAll();
    }

    public List<LichDay> findLichDayOfGiaoVien(GiaoVien gv, String ngay) {
        return ldRepo.findLichDayOfGVByDate(gv.getId(), LocalDate.parse(ngay, formatter));
    }
}
