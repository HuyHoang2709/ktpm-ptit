package com.example.be.service;

import com.example.be.entity.GiaoVien;
import com.example.be.repository.GiaoVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuanLyGiaoVienService {
    @Autowired
    private GiaoVienRepository gvRepo;

    public Boolean hasUsername(String username) {
        return gvRepo.existsByUsername(username);
    }

    public GiaoVien createGiaoVien(GiaoVien gv) {
        return gvRepo.save(gv);
    }

    public List<GiaoVien> findAllGiaoVien() {
        return gvRepo.findAll();
    }

    public GiaoVien findGiaoVienById(Integer id) {
        return gvRepo.findById(id).orElse(null);
    }

    public GiaoVien updateGiaoVien(GiaoVien gv) {
        return gvRepo.save(gv);
    }

    public void deleteGiaoVien(Integer id) {
        gvRepo.deleteById(id);
    }
}
