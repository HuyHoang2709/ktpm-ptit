package com.example.be;

import com.example.be.entity.GiaoVien;
import com.example.be.entity.NVQuanLy;
import com.example.be.repository.GiaoVienRepository;
import com.example.be.repository.NVQuanLyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
public class BeApplication {
    @Autowired
    private GiaoVienRepository giaoVienRepository;

    @Autowired
    private NVQuanLyRepository nvQuanLyRepository;


    public static void main(String[] args) {
        SpringApplication.run(BeApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        return args -> {
            if (!nvQuanLyRepository.existsByUsername("admin")) {
                NVQuanLy admin = new NVQuanLy();
                admin.setUsername("admin");
                admin.setPassword("adminpass");
                admin.setHoten("Quản trị viên");
                admin.setNgaysinh(LocalDate.parse("01-01-2001", formatter));
                admin.setSdt("0123456789");
                admin.setEmail("admin@example.com");
                nvQuanLyRepository.save(admin);
                System.out.println("Created NVQuanLy: admin / adminpass");
            }

            if (!giaoVienRepository.existsByUsername("gv001")) {
                GiaoVien teacher = new GiaoVien();
                teacher.setUsername("gv001");
                teacher.setPassword("teacher001");
                teacher.setHoten("Bùi Huy Hoàng");
                teacher.setNgaysinh(LocalDate.parse("27-09-2003", formatter));
                teacher.setSdt("0941175966");
                teacher.setEmail("hoangbh@example.com");
                teacher.setTrinhdo("Cử nhân");
                teacher.setChuyenmon("IELTS");
                giaoVienRepository.save(teacher);
                System.out.println("Created GiaoVien: gv001 / teacher001");
            }
        };
    }

}
