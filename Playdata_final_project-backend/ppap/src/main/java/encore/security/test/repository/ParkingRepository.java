package encore.security.test.repository;



import encore.security.test.entity.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ParkingRepository extends JpaRepository<Parking, Long> {

    @Query("SELECT p from Parking p where p.parkname = ?1")
    public Parking findByName(String name);



    @Query("SELECT p from Parking p where p.parking_id = ?1")
    public Parking findByparkid(Long id);

    //Optional<Account> findByUsername(String username);
//    Optional<Parking> findByparkname(String parkname);



}
