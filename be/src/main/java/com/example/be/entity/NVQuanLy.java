package com.example.be.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "nvquanly")
public class NVQuanLy extends NhanVien{
}
