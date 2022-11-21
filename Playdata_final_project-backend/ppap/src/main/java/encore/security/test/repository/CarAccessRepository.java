package encore.security.test.repository;

import encore.security.test.entity.CarAccess;


import encore.security.test.entity.Detected;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarAccessRepository extends JpaRepository<CarAccess , Long> {

    @Query("SELECT c from CarAccess c where c.accesscarnum=?1")
    public CarAccess findbyCarName(String accesscarnum);


    // Dto에 Detected 변수 형성
    @Query("SELECT distinct c , d.detectedid , d.checked FROM CarAccess c LEFT JOIN Detected d ON c.accessid = d.carAccess.accessid where c.parking.parking_id = ?1")
    List<CarAccess> findAllbyparkId(Long originUserparkid);

    @Query("SELECT c from CarAccess c  where c.accesscarnum=?1 and c.outimg IS null ")
    public CarAccess findTopByOrderByIdDesc(String accesscarnum);

//    @Query("SELECT c from CarAccess c where c.accesscarnum=?1 ")
//    List<CarAccess> findTopByOrderByAccesscarnumDesc(String accesscarnum);

    @Query("SELECT c from CarAccess c where c.accesscarnum=?1 and c.outimg IS null ORDER BY c.accessid desc ")
    List<CarAccess> findTopByOrderByAccesscarnumDesc(String accesscarnum);

    @Query("SELECT c from CarAccess c where c.accesscarnum=?1 and c.outimg IS null ORDER BY c.accessid asc ")
    List<CarAccess> findTopByOrderByAccesscarnumAsc(String accesscarnum);

    @Query("SELECT c.detected from CarAccess c where c.parking.parking_id= ?1")
    List<Detected> findByDetected(Long parkid);

    @Query("SELECT COUNT(c.detected) from CarAccess c where c.parking.parking_id = ?1 and  c.detected.checked is false ")
    public Long CountNonCheckDetectedInfo(Long parkid);

    @Query("SELECT c from CarAccess c WHERE c.accesscarnum = ?1 and c.outimg IS null and c.validation is false and c.registered is true")
    public CarAccess findByDetectCar(String accesscarnum);

    @Query("SELECT COUNT(c) FROM CarAccess c where c.parking.parking_id = ?1 and c.outimg is null and c.registered is true ")
    public Long countCarAccessByEnableParking(Long parkid);

    @Query("SELECT COUNT(c) FROM CarAccess c where c.parking.parking_id = ?1 and c.outimg is null and c.registered is FALSE")
    public Long countCarNonRegisterdAccessByEnableParking(Long parkid);

    @Query("SELECT COUNT(c) from CarAccess c where c.parking.parking_id = ?1")
    public Long CountCheckAllDetectedInfo(Long originUserparkid);
}
