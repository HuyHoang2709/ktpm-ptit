package com.example.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "dangkyday")
public class DangKyDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "giaovienid")
    private GiaoVien giaovien;

    @ManyToOne
    @JoinColumn(name = "lophocid")
    private LopHoc lophoc;
}
