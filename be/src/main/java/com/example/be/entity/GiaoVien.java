package com.example.be.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "giaovien")
public class GiaoVien extends NhanVien {
    @Column(nullable = false)
    private String trinhdo;

    @Column(nullable = false)
    private String chuyenmon;
}
