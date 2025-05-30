package com.example.be.service;

import com.example.be.entity.*;
import com.example.be.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class LenLichDayService {
    @Autowired
    private GiaoVienRepository gvRepo;

    @Autowired
    private BuoiHocRepository bhRepo;

    @Autowired
    private PhongHocRepository phRepo;

    @Autowired
    private LichDayRepository ldRepo;

    @Autowired
    private DangKyDayRepository dkdRepo;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public boolean existGiaoVien(GiaoVien gv) {
        Example<GiaoVien> example = Example.of(gv,
                ExampleMatcher.matching()
                        .withIgnoreCase(false)
                        .withIgnoreNullValues()
                        .withStringMatcher(ExampleMatcher.StringMatcher.EXACT));
        return gvRepo.exists(example);
    }

    public List<BuoiHoc> findAllBuoiHoc() {
        return bhRepo.findAll();
    }

    public List<PhongHoc> findAllAvailablePhongHoc(BuoiHoc bh, String ngay) {
        List<PhongHoc> dsPhong = phRepo.findAll();
        List<PhongHoc> dsPhongDaDung = ldRepo.findLichDayTheoBuoiAndDate(bh.getId(), LocalDate.parse(ngay, formatter)).stream().map(LichDay::getPhonghoc).toList();
        dsPhong.removeAll(dsPhongDaDung);
        return dsPhong;
    }

    public List<LichDay> findLichDayOfGiaoVien(GiaoVien gv, String ngay) {
        return ldRepo.findLichDayOfGVByDate(gv.getId(), LocalDate.parse(ngay, formatter));
    }

    public boolean existDangKyDay(DangKyDay dkd) {
        Example<DangKyDay> example = Example.of(dkd,
                ExampleMatcher.matching()
                        .withIgnoreCase(false)
                        .withIgnoreNullValues()
                        .withStringMatcher(ExampleMatcher.StringMatcher.EXACT));
        return dkdRepo.exists(example);
    }

    public boolean existBuoiHoc(BuoiHoc bh) {
        Example<BuoiHoc> example = Example.of(bh,
                ExampleMatcher.matching()
                        .withIgnoreCase(false)
                        .withIgnoreNullValues()
                        .withStringMatcher(ExampleMatcher.StringMatcher.EXACT));
        return bhRepo.exists(example);
    }

    public boolean existPhongHoc(PhongHoc ph) {
        Example<PhongHoc> example = Example.of(ph,
                ExampleMatcher.matching()
                        .withIgnoreCase(false)
                        .withIgnoreNullValues()
                        .withStringMatcher(ExampleMatcher.StringMatcher.EXACT));
        return phRepo.exists(example);
    }

    public boolean existLichDay(BuoiHoc bh, PhongHoc ph, LocalDate ngay) {
        Optional<LichDay> ld = ldRepo.findLichDaysByBuoihocAndPhonghocAndNgay(bh, ph, ngay);
        return ld.isPresent();
    }

    public LichDay createLichDay(LichDay ld) {
        return ldRepo.save(ld);
    }

    public LichDay findLichDayById(int id) {
        return ldRepo.findById(id).orElse(null);
    }

    public void deleteLichDay(int id) {
        ldRepo.deleteById(id);
    }

    public LichDay updateGiaoVien(LichDay ld) {
        return ldRepo.save(ld);
    }
}
