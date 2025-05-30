package com.example.be.controller;

import com.example.be.entity.*;
import com.example.be.service.LenLichDayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/lichday")
public class LenLichDayController {

    @Autowired
    private LenLichDayService lldSv;

    @GetMapping("/buoihoc")
    public ResponseEntity<?> timTatCaBuoiHoc() {
        return ResponseEntity.ok().body(lldSv.findAllBuoiHoc());
    }

    @PostMapping("/phonghoc")
    public ResponseEntity<?> timTatCaPhongHocConTrong(@RequestBody BuoiHoc bh, @RequestParam String ngay) {
        return ResponseEntity.ok().body(lldSv.findAllAvailablePhongHoc(bh, ngay));
    }

    @PostMapping("/")
    public ResponseEntity<?> timLichDayCuaGV(@RequestBody GiaoVien gv, @RequestParam String ngay) {
        // Kiểm tra xem giáo viên có tồn tại trong hệ thống không
        if (!lldSv.existGiaoVien(gv)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại giáo viên trong CSDL");
        }

        try {
            List<LichDay> dsLichDay = lldSv.findLichDayOfGiaoVien(gv, ngay);
            return ResponseEntity.ok().body(dsLichDay);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/new")
    public ResponseEntity<?> taoLichDay(@RequestBody LichDay ld) {
        DangKyDay dkd = ld.getDangkyday();
        BuoiHoc bh = ld.getBuoihoc();
        PhongHoc ph = ld.getPhonghoc();
        LocalDate ngay = ld.getNgay();

        // Kiểm tra xem đăng ký dạy có tồn tại trong hệ thống không
        if(!lldSv.existDangKyDay(dkd)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại đăng ký dạy trong CSDL");
        }

        // Kiểm tra xem buổi học có tồn tại trong hệ thống không
        if(!lldSv.existBuoiHoc(bh)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại buổi học trong CSDL");
        }

        // Kiểm tra xem phòng học có tồn tại trong hệ thống không
        if(!lldSv.existPhongHoc(ph)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại phòng học trong CSDL");
        }

        // Kiểm tra xem có lịch dạy nào khác tại thời gian và địa điểm này chưa
        if(lldSv.existLichDay(bh, ph, ngay)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Đã có lịch dạy vào thời gian và địa điểm này");
        }

        try {
            LichDay newLichDay = lldSv.createLichDay(ld);
            return ResponseEntity.ok().body(newLichDay);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{ldId}")
    public ResponseEntity<?> xoaLichDay(@PathVariable int ldId) {
        // Kiểm tra xem có lịch dạy cần xóa trong DB chưa
        LichDay ld = lldSv.findLichDayById(ldId);
        if(ld == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Xóa lịch dạy trong DB
        try {
            lldSv.deleteLichDay(ldId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> suaLichDay(@RequestBody LichDay ld) {
        // Kiểm tra xem lịch dạy có trong DB chưa
        if(lldSv.findLichDayById(ld.getId()) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Thực hiện cập nhật trong DB
        try {
            LichDay updateLD = lldSv.updateGiaoVien(ld);
            return ResponseEntity.ok().body(updateLD);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
