package com.example.be.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "coso")
public class CoSo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String ten;

    @Column(nullable = false)
    private String diachi;

    @OneToMany(mappedBy = "coso")
    private Set<PhongHoc> phonghoc;
}
