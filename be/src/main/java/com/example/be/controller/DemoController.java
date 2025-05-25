package com.example.be.controller;

import com.example.be.entity.GiaoVien;
import com.example.be.repository.GiaoVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Controller
public class DemoController {

    @Autowired
    private GiaoVienRepository giaoVienRepository;

    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> test() {
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Server is running at port 8080");
        return ResponseEntity.ok(map);
    }

    @PostMapping("/test/giaovien")
    public ResponseEntity<List<GiaoVien>> timGiaoVienTheoNgaySinh(@RequestParam String ngaysinh) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        List<GiaoVien> listGv = giaoVienRepository.findGiaoVienByNgaysinh(LocalDate.parse(ngaysinh, formatter));

        return ResponseEntity.ok(listGv);
    }
}
