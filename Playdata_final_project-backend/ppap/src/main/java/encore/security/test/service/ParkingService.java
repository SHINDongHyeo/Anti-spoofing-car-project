package encore.security.test.service;

import encore.security.test.dto.parking.ParkInfoUpdateDto;
import encore.security.test.dto.parking.ParkingDto;
import encore.security.test.dto.parking.ParkingReponseDto;
import encore.security.test.entity.Parking;
import encore.security.test.exception.DuplicateMemberException;
import encore.security.test.repository.ParkingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParkingService {

    private final ParkingRepository parkingRepository;

    public ParkingService(ParkingRepository parkingRepository) {
        this.parkingRepository = parkingRepository;

    }

    public List<ParkingReponseDto> findAllParking() {
        List<Parking> parkings = parkingRepository.findAll();
        return parkings.stream().map(ParkingReponseDto::findParking).collect(Collectors.toList());
    }



    @Transactional
    public ParkingDto inputParking(ParkingDto parkingDto){
        if (parkingRepository.findByName(parkingDto.getParkname()) != null) {
            throw new DuplicateMemberException("이미 등록되어 있는 주차장입니다.");
        }

        Parking parking = Parking.builder()
                .parkname(parkingDto.getParkname())
                .building(parkingDto.getBuilding())
                .address(parkingDto.getAddress())
                .freetime(parkingDto.getFreetime())
                .baserate(parkingDto.getBaserate())
                .eleccharger(parkingDto.getEleccharger())
                .allarea(parkingDto.getAllarea())
                .enablearea(parkingDto.getEnablearea())
                .endtime(parkingDto.getEndtime())
                .build();

        return ParkingDto.toSaveParkingEntity(parkingRepository.save(parking));

    }

    @Transactional
    public void updateParking(ParkInfoUpdateDto parkInfoUpdateDto ) {

        Parking originparking = parkingRepository.findByName(parkInfoUpdateDto.getParkname());

        if (parkInfoUpdateDto.getBuilding().isEmpty()) {
            parkInfoUpdateDto.setBuilding(originparking.getBuilding());
        }
        if (parkInfoUpdateDto.getNewparkname().isEmpty()) {
            parkInfoUpdateDto.setNewparkname(originparking.getParkname());
        }
        if (parkInfoUpdateDto.getAllarea() == null) {
            parkInfoUpdateDto.setAllarea(originparking.getAllarea());
        }
        if (parkInfoUpdateDto.getAddress().isEmpty()) {
            parkInfoUpdateDto.setAddress(originparking.getAddress());
        }
        if (parkInfoUpdateDto.getFreetime().isEmpty()) {
            parkInfoUpdateDto.setFreetime(originparking.getFreetime());
        }
        if (parkInfoUpdateDto.getEndtime()== null) {
            parkInfoUpdateDto.setEndtime(originparking.getEndtime());
        }
        if (parkInfoUpdateDto.getEleccharger() == null) {
            parkInfoUpdateDto.setEleccharger(originparking.getEleccharger());
        }
        if (parkInfoUpdateDto.getStarttime()== null) {
            parkInfoUpdateDto.setStarttime(originparking.getStarttime());
        }

        originparking.updateparking(parkInfoUpdateDto);






    }}
