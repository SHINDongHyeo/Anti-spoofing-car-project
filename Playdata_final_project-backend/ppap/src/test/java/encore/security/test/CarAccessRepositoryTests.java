package encore.security.test;

import encore.security.test.entity.CarAccess;
import encore.security.test.entity.Parking;

import encore.security.test.repository.CarAccessRepository;
import encore.security.test.repository.ParkingRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class CarAccessRepositoryTests {

//    @Autowired
//    ParkingRepository parkingRepository;
//
//    @Autowired
//    CarAccessRepository carAccessRepository;
//
//    @Test
//    public void testCreateCarAcess(){
//
////        ResidentGroup residentGroup1 = new ResidentGroup();
//        CarAccess carAccess = new CarAccess();
//
//
//        carAccess.setAccesscarnum("242주5083");
////        carAccess.setIntime("20221101");
//        carAccess.setInimg("test");
//
//
//        Parking parking = parkingRepository.findByName("test");
//
//        carAccess.setParking(parking);
//
//        carAccessRepository.save(carAccess);
//
//
//    }
}
