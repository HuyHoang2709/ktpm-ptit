package com.example.be.controller;

import com.example.be.entity.DangKyDay;
import com.example.be.entity.GiaoVien;
import com.example.be.entity.LopHoc;
import com.example.be.service.DangKyDayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/api/dangkyday")
public class DangKyDayController {

    @Autowired
    private DangKyDayService dkdSv;

    @GetMapping("/dslop")
    public ResponseEntity<?> timTatCaLopHoc() {
        return ResponseEntity.ok().body(dkdSv.findAllLopHoc());
    }

    @PostMapping("/giaovien")
    public ResponseEntity<?> timDangKyDayCuaGiaoVien(@RequestBody GiaoVien giaoVien) {
        return ResponseEntity.ok().body(dkdSv.findDKDByGV(giaoVien));
    }

    @PostMapping("/lophoc")
    public ResponseEntity<?> timDangKyDayTheoLopHoc(@RequestBody LopHoc lopHoc) {
        return ResponseEntity.ok().body(dkdSv.findDKDByLH(lopHoc));
    }

    @PostMapping("/new")
    public ResponseEntity<?> taoDangKyDay(@RequestBody DangKyDay dangKyDay) {
        GiaoVien gv = dangKyDay.getGiaovien();
        LopHoc lop = dangKyDay.getLophoc();

        // Kiểm tra xem giáo viên có tồn tại trong hệ thống không
        if (!dkdSv.existGiaoVien(gv)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại giáo viên trong CSDL");
        }

        // Kiểm tra xem lớp có tồn tại trong hệ thống không
        if (!dkdSv.existLopHoc(lop)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tồn tại lớp học trong CSDL");
        }

        // Kiểm tra xem còn lớp để đăng ký không
        if (dkdSv.checkOutOfLopHoc(lop)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Không còn đủ lớp để đăng ký dạy");
        }

        // Kiểm tra xem đã tồn tại đăng ký dạy chưa
        if (dkdSv.existDangKyDay(dangKyDay)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Đã đăng ký dạy lớp này");
        }

        try {
            DangKyDay newDKD = dkdSv.saveDangKyDay(dangKyDay);
            return ResponseEntity.ok().body(newDKD);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
