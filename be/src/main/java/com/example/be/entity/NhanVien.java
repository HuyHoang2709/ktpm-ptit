package com.example.be.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public class NhanVien extends ThanhVien {
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;
}
