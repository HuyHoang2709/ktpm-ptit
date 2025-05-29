package com.example.be.repository;

import com.example.be.entity.BuoiHoc;
import com.example.be.entity.LichDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LichDayRepository extends JpaRepository<LichDay, Integer> {
    @Query("SELECT ld from LichDay ld where ld.dangkyday.giaovien.id = :gvId and ld.ngay = :ngay")
    List<LichDay> findLichDayOfGVByDate(@Param("gvId") Integer id, @Param("ngay") LocalDate ngay);

    @Query("select ld from LichDay ld where ld.buoihoc.id = :bhId and ld.ngay = :ngay")
    List<LichDay> findLichDayTheoBuoiAndDate(@Param("bhId") Integer id, @Param("ngay") LocalDate ngay);
}
