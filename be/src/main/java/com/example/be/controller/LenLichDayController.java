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

    @PostMapping("/lophoc")
    public ResponseEntity<?> timLichDayLopTheoNgay(@RequestBody LopHoc lh, @RequestParam String ngay) {
        // Kiểm tra xem lớp học có tồn tại trong hệ thống không
        if(!lldSv.existLopHoc(lh)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại lớp học trong CSDL");
        }

        try {
            List<LichDay> dsLichDay = lldSv.findLichDayLopByNgay(lh, ngay);
            return ResponseEntity.ok().body(dsLichDay);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/new")
    public ResponseEntity<?> taoLichDayMoi(@RequestBody LichDay ld) {
        DangKyDay dkd = ld.getDangkyday();
        LocalDate ngay = ld.getNgay();
        BuoiHoc bh = ld.getBuoihoc();
        PhongHoc ph = ld.getPhonghoc();

        // Kiểm tra xem phòng học có tồn tại không
        if(!lldSv.existPhongHoc(ph)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại phòng học trong CSDL");
        }

        // Kiểm tra xem buổi học có tồn tại trong hệ thống không
        if(!lldSv.existBuoiHoc(bh)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại buổi học trong CSDL");
        }

        // Kiểm tra xem đăng ký dạy có tồn tại trong hệ thống không
        if(!lldSv.existDangKyDay(dkd)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại đăng ký dạy trong CSDL");
        }

        // Kiểm tra xem có lịch dạy nào khác tại thời gian và địa điểm này chưa
        if(lldSv.existLichDay(bh, ph, ngay)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Đã có lịch dạy vào thời gian và địa điểm này");
        }

        // Kiểm tra xem giáo viên có lịch dạy vào thời gian này chưa
        if(lldSv.isGiaoVienHasLichDay(dkd.getGiaovien(), bh, ngay)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Giáo viên đã có lịch trong thời gian này");
        }

        try {
            LichDay newLichDay = lldSv.createLichDay(ld);
            return ResponseEntity.ok().body(newLichDay);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> suaLichDay(@RequestBody LichDay ld) {
        // Kiểm tra xem lịch dạy có trong DB chưa
        if(lldSv.findLichDayById(ld.getId()) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Kiểm tra xem giáo viên có lịch dạy vào thời gian này chưa
        if(lldSv.isGiaoVienHasLichDay(ld.getDangkyday().getGiaovien(), ld.getBuoihoc(), ld.getNgay())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Giáo viên đã có lịch trong thời gian này");
        }

        // Thực hiện cập nhật trong DB
        try {
            LichDay updateLD = lldSv.updateLichDay(ld);
            return ResponseEntity.ok().body(updateLD);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> xoaLichDay(@PathVariable int id) {
        // Kiểm tra xem có lịch dạy cần xóa trong DB chưa
        LichDay ld = lldSv.findLichDayById(id);
        if(ld == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Xóa lịch dạy trong DB
        try {
            lldSv.deleteLichDay(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
