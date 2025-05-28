package com.example.be.service;

import com.example.be.entity.DangKyDay;
import com.example.be.entity.GiaoVien;
import com.example.be.entity.LopHoc;
import com.example.be.repository.DangKyDayRepository;
import com.example.be.repository.GiaoVienRepository;
import com.example.be.repository.LopHocRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        return gvRepo.existsById(gv.getId());
    }

    public boolean existLopHoc(LopHoc lh) {
        return lhRepo.existsById(lh.getId());
    }

    public boolean existDangKyDay(GiaoVien gv, LopHoc lop) {
        Optional<DangKyDay> tempDKD = dkdRepo.findByGiaovienAndLophoc(gv, lop);
        return tempDKD.isPresent();
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
