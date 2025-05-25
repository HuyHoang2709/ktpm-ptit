package com.example.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "lophoc")
public class LopHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String ten;

    private String mota;

    @Column(nullable = false)
    private Double hocphi;

    @Column(nullable = false)
    private Integer solop;

    @ManyToOne
    @JoinColumn(name = "chuongtrinhhocid")
    private ChuongTrinhHoc chuongtrinhhoc;
}
