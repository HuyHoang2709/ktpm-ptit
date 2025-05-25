package com.example.be.service;

import com.example.be.entity.GiaoVien;
import com.example.be.entity.NVQuanLy;
import com.example.be.repository.GiaoVienRepository;
import com.example.be.repository.NVQuanLyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private NVQuanLyRepository nvQuanLyRepository;

    @Autowired
    private GiaoVienRepository giaoVienRepository;

    public Map<String, Object> authenticateUser(String username, String password) {
        // Tìm nhân viên quản lý trước
        Optional<NVQuanLy> nvQuanLyOptional = nvQuanLyRepository.findByUsername(username);
        if (nvQuanLyOptional.isPresent()) {
            NVQuanLy nvQuanLy = nvQuanLyOptional.get();
            if (password.equals(nvQuanLy.getPassword())) {
                Map<String, Object> map = new HashMap<>();
                map.put("info", nvQuanLy);
                map.put("role", "quanly");
                return map;
            }
        }

        // Nếu không có tìm giáo viên
        Optional<GiaoVien> giaoVienOptional = giaoVienRepository.findByUsername(username);
        if (giaoVienOptional.isPresent()) {
            GiaoVien giaoVien = giaoVienOptional.get();
            if (password.equals(giaoVien.getPassword())) {
                Map<String, Object> map = new HashMap<>();
                map.put("info", giaoVien);
                map.put("role", "giaovien");
                return map;
            }
        }
        return null;
    }
}
