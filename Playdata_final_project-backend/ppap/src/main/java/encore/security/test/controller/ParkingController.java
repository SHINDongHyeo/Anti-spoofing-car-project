package encore.security.test.controller;

import encore.security.test.dto.parking.ParkInfoUpdateDto;
import encore.security.test.dto.parking.ParkingDto;
import encore.security.test.dto.parking.ParkingReponseDto;
import encore.security.test.service.ParkingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController // REST API + Controller [ 티 API와 ( React , 외부의 특정 서버 ) ->
@RequestMapping("/api")
public class ParkingController {

    private final ParkingService parkingService;

    public ParkingController(ParkingService parkingService) {
        this.parkingService = parkingService;
    }


    // GET , POST , PUT
    // 주차장 등록 컨트롤러
    @PostMapping("/inputParking")
    @PreAuthorize("hasAnyRole('SYSADMIN')")
    public ResponseEntity<ParkingDto> inputParking(
            @Valid @RequestBody ParkingDto parkingDto
    ) {
        return ResponseEntity.ok(parkingService.inputParking(parkingDto)); //HTTP 200 -> OK
    }

    // 전체 주차장 조회 배포 시 권한은 SYSADMIN에 한정
    @GetMapping("/findParking")
    @PreAuthorize("hasAnyRole('SYSADMIN')")
    public ResponseEntity<List<ParkingReponseDto>> findAllParking(){
        return ResponseEntity.ok(parkingService.findAllParking());
    }

    //등록 주차장의 정보를 변경하는 내용으로 서비스의 주요 테이블인 만큼 오로지 SYSADMIN에서 권한을 가짐
    @PutMapping("/parking/update")
    @PreAuthorize("hasAnyRole('SYSADMIN')")
    public ResponseEntity<Void> updateParking(
            @RequestBody @Valid ParkInfoUpdateDto parkInfoUpdateDto){

        parkingService.updateParking(parkInfoUpdateDto);
        return new ResponseEntity(HttpStatus.OK);

    }




}
