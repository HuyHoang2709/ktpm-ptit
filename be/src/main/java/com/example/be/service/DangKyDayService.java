package com.example.be.service;

import com.example.be.entity.DangKyDay;
import com.example.be.entity.GiaoVien;
import com.example.be.entity.LopHoc;
import com.example.be.repository.DangKyDayRepository;
import com.example.be.repository.GiaoVienRepository;
import com.example.be.repository.LopHocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DangKyDayService {

    @Autowired
    private LopHocRepository lhRepo;

    @Autowired
    private DangKyDayRepository dkdRepo;

    @Autowired
    private GiaoVienRepository gvRepo;

    public List<LopHoc> findAllLopHoc() {
        return lhRepo.findAll();
    }

    public List<DangKyDay> findDKDByGV(GiaoVien gv) {
        return dkdRepo.findDangKyDaysByGiaovien(gv);
    }

    public List<DangKyDay> findDKDByLH(LopHoc lh) {
        return dkdRepo.findDangKyDaysByLophoc(lh);
    }

    public boolean existGiaoVien(GiaoVien gv) {
        Example<GiaoVien> example = Example.of(gv,
                ExampleMatcher.matching()
                        .withIgnoreCase(false)
                        .withIgnoreNullValues()
                        .withStringMatcher(ExampleMatcher.StringMatcher.EXACT));
        return gvRepo.exists(example);
    }

    public boolean existLopHoc(LopHoc lh) {
        Example<LopHoc> example = Example.of(lh,
                ExampleMatcher.matching()
                        .withIgnoreCase(false)
                        .withIgnoreNullValues()
                        .withStringMatcher(ExampleMatcher.StringMatcher.EXACT));
        return lhRepo.exists(example);
    }

    public boolean existDangKyDay(DangKyDay dkd) {
        Example<DangKyDay> example = Example.of(dkd,
                ExampleMatcher.matching()
                        .withIgnoreCase(false)
                        .withIgnoreNullValues()
                        .withStringMatcher(ExampleMatcher.StringMatcher.EXACT));
        return dkdRepo.exists(example);
    }

    public boolean checkOutOfLopHoc(LopHoc lopHoc) {
        int soLop = lopHoc.getSolop();
        List<DangKyDay> dkd = dkdRepo.findDangKyDaysByLophoc(lopHoc);
        return dkd.size() == soLop;
    }

    public DangKyDay saveDangKyDay(DangKyDay dkd) {
        return dkdRepo.save(dkd);
    }
}
