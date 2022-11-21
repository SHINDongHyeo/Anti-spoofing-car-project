package encore.security.test.repository;

import encore.security.test.entity.Residence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResidenceRepository extends JpaRepository<Residence , Long> {

    @Query("SELECT r from Residence r where r.carnum=?1")
    public Residence findByName(String carnum);

    @Query("SELECT r from Residence r where r.parking.parking_id= ?1")
    List<Residence> findAllbyparkId(Long park_id);

}
