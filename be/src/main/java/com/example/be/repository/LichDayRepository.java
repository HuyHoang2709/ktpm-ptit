package com.example.be.repository;

import com.example.be.entity.BuoiHoc;
import com.example.be.entity.LichDay;
import com.example.be.entity.PhongHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface LichDayRepository extends JpaRepository<LichDay, Integer> {
    @Query("select ld from LichDay ld where ld.dangkyday.lophoc.id = :lhId and ld.ngay = :ngay")
    List<LichDay> findLichDayLopByDate(@Param("lhId") int id, @Param("ngay") LocalDate ngay);

    @Query("select ld from LichDay ld where ld.buoihoc.id = :bhId and ld.ngay = :ngay")
    List<LichDay> findLichDayTheoBuoiAndDate(@Param("bhId") Integer id, @Param("ngay") LocalDate ngay);

    Optional<LichDay> findLichDaysByBuoihocAndPhonghocAndNgay(BuoiHoc bh, PhongHoc ph, LocalDate ngay);

    @Query("select ld from LichDay ld where ld.dangkyday.giaovien.id = :gvId and ld.buoihoc.id = :bhId and ld.ngay = :ngay")
    Optional<LichDay> findLichDayOfGiaoVienByTime(@Param("gvId") int gvId, @Param("bhId") int bhId, @Param("ngay") LocalDate ngay);
}
