package com.example.be.controller;

import com.example.be.entity.BuoiHoc;
import com.example.be.entity.GiaoVien;
import com.example.be.entity.LichDay;
import com.example.be.service.LenLichDayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/lichday")
public class LenLichDayController {

    @Autowired
    private LenLichDayService lldSv;

    @GetMapping("/buoihoc")
    public ResponseEntity<?> timTatCaBuoiHoc() {
        try {
            List<BuoiHoc> dsBuoiHoc = lldSv.findAllBuoiHoc();
            return ResponseEntity.ok().body(dsBuoiHoc);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> timLichDayCuaGV(@RequestBody GiaoVien gv, @RequestParam String ngay) {
        // Kiểm tra xem giáo viên có tồn tại trong hệ thống không
        if(!lldSv.existGiaoVien(gv)) {
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
}
