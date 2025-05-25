package com.example.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "lichday")
public class LichDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Column(nullable = false)
    private LocalDate ngay;

    @ManyToOne
    @JoinColumn(name = "dangkydayid")
    private DangKyDay dangkyday;

    @ManyToOne
    @JoinColumn(name = "buoihocid")
    private BuoiHoc buoihoc;

    @ManyToOne
    @JoinColumn(name = "phonghocid")
    private PhongHoc phonghoc;
}
