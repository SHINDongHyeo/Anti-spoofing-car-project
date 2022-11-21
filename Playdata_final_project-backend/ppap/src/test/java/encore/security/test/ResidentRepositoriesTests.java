package encore.security.test;


import encore.security.test.entity.Parking;

import encore.security.test.entity.Residence;
import encore.security.test.entity.ResidentGroup;
import encore.security.test.repository.ParkingRepository;
import encore.security.test.repository.ResidenceRepository;
import encore.security.test.repository.ResidentGroupRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class ResidentRepositoriesTests {

//    @Autowired
//    ResidentGroupRepository repository;
//
//    @Autowired
//    ParkingRepository parkingRepository;
//
//    @Autowired
//    ResidenceRepository rsrepo;
//
//    @Test
//    public void testCreateResidence(){
//        Residence residence = new Residence();
//
//        residence.setCarnum("242주5083");
//        residence.setOwner("김진원");
//        residence.setPhone("01055401763");
//        residence.setResiaddress("양재");
//        residence.setCarpicture("urlgldsklgs");
//        residence.setStartdate("20221031");
//        residence.setEnddate("20221101");
//        residence.setFeature("Santafe");
//        residence.setSecondphone("01012341234");
//
//        Parking parking = parkingRepository.findByName("test");
//        ResidentGroup residentGroup = repository.findByName("111");
//
//        residence.setParking(parking);
//        residence.setResidentGroup(residentGroup);
//
//        rsrepo.save(residence);
//
//    }
//
//    //@Test
//    public void testCreateResidentGroup(){
//
//        ResidentGroup residentGroup1 = new ResidentGroup();
//
//        residentGroup1.setGroupcode("111");
//        residentGroup1.setGroupname("test");
//        residentGroup1.setEndtime("test");
//        residentGroup1.setTotalprice(5000L);
//
//        Parking parking = parkingRepository.findByName("test");
//
//        residentGroup1.setParking(parking);
//
//        repository.save(residentGroup1);
//
//
//    }

}
