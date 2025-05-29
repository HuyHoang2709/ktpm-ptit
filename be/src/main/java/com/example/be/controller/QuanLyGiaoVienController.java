package com.example.be.controller;

import com.example.be.entity.GiaoVien;
import com.example.be.service.QuanLyGiaoVienService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/giaovien")
@Slf4j
public class QuanLyGiaoVienController {

    @Autowired
    private QuanLyGiaoVienService qlgvSv;

    @PostMapping("/new")
    public ResponseEntity<?> taoGiaoVienMoi(@RequestBody GiaoVien gv) {
        // Kiểm tra username mới đã được sử dụng bởi người khác hay chưa
        String username = gv.getUsername();
        if (qlgvSv.hasUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Lưu giáo viên mới vào DB
        try {
            GiaoVien newGV = qlgvSv.createGiaoVien(gv);
            return ResponseEntity.ok().body(newGV);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> timTatCaGiaoVien() {
        return ResponseEntity.ok().body(qlgvSv.findAllGiaoVien());
    }

    @PutMapping("/")
    public ResponseEntity<?> suaGiaoVien(@RequestBody GiaoVien gv) {
        // Kiểm tra xem có giáo viên cần sửa trong DB chưa
        int id = gv.getId();
        GiaoVien oldGV = qlgvSv.findGiaoVienById(id);
        if (oldGV == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Kiểm tra username mới sửa có được dùng bởi người khác hay chưa
        String username = gv.getUsername();
        if (!Objects.equals(username, oldGV.getUsername()) && qlgvSv.hasUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Thực hiện cập nhật trong DB
        try {
            GiaoVien updatedGV = qlgvSv.updateGiaoVien(gv);
            return ResponseEntity.ok().body(updatedGV);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{gvId}")
    public ResponseEntity<?> xoaGiaoVien(@PathVariable int gvId) {
        // Kiểm tra xem có giáo viên cần sửa trong DB chưa
        GiaoVien gv = qlgvSv.findGiaoVienById(gvId);
        if (gv == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Xóa giáo viên trong DB
        try {
            qlgvSv.deleteGiaoVien(gvId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
