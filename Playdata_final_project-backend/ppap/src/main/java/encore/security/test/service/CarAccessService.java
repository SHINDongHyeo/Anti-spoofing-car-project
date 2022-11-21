package encore.security.test.service;


import encore.security.test.dto.caraccess.*;
import encore.security.test.entity.*;
import encore.security.test.exception.NotFoundMemberException;
import encore.security.test.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarAccessService {


    private final CarAccessRepository carAccessRepository;
    private final ParkingRepository parkingRepository;
    private final ResidenceRepository residenceRepository;
    private final UserRepository userRepository;
    private final DetectedRepository detectedRepository;

    public CarAccessService(CarAccessRepository carAccessRepository , ParkingRepository parkingRepository , ResidenceRepository residenceRepository , DetectedRepository detectedRepository , UserRepository userRepository) {
        this.carAccessRepository = carAccessRepository;
        this.parkingRepository = parkingRepository;
        this.residenceRepository = residenceRepository;
        this.detectedRepository = detectedRepository;
        this.userRepository = userRepository;

    }

    @Transactional
    public String registerCarAccess(CarAccessDto carAccessDto){

        Parking parking = parkingRepository.findByparkid(carAccessDto.getParkid());

        Boolean registered = Boolean.FALSE;
        Boolean valid = Boolean.FALSE;
        String result = null;


        // 입차 차량 등록 여부 확인 로직
        Residence residence = residenceRepository.findByName(carAccessDto.getAccesscarnum());
        if(residence!=null && residence.getParking().getParkname().equals(parking.getParkname())){
            registered = Boolean.TRUE;
        }

        // 입차 차량 중 출차 이미지가 없는 차량 중 기입된 차번호 내림차순 확인 로직
        List<CarAccess> carAccess2 = carAccessRepository.findTopByOrderByAccesscarnumDesc(carAccessDto.getAccesscarnum());

        if(!carAccess2.isEmpty()) {
            CarAccess carAccess3 = carAccess2.stream().findAny().get();
            valid = Boolean.TRUE;
            carAccess3.validSet("이상감지" , true);
            Detected detected = new Detected();
            detected.setCarAccess(carAccess3);
            detected.setChecked(false);
            detectedRepository.save(detected);

        }

        CarAccess carAccess = CarAccess.builder()
                .accesscarnum(carAccessDto.getAccesscarnum())
                .parking(parking)
                .registered(registered)
                .validation(valid)
                .inimg(carAccessDto.getInimg())
                .outimg(null)
                .build();


        CarAccessTestDto.savetest(carAccessRepository.save(carAccess));

        if(carAccess.getRegistered() && !carAccess.getValidation()){
            result = carAccess.getAccesscarnum();
        }


        return result;

    }
    public List<CarAccessDto> findAllCar() {
        List<CarAccess> carAccesses = carAccessRepository.findAll();
        return carAccesses.stream().map(CarAccessDto::findAllCar).collect(Collectors.toList());
    }

    @Transactional
    public void DetectedCar(){

    }

    //입차 로직
    @Transactional
    public String testCarAccess(CarAccessTestDto carAccessTestDto) {

        Parking parking = parkingRepository.findByparkid(carAccessTestDto.getPark_id());

        Boolean registered = Boolean.FALSE;
        Boolean valid = Boolean.FALSE;
        String result = null;

        // 입차 차량 등록 여부 확인 로직
        Residence residence = residenceRepository.findByName(carAccessTestDto.getAccesscarnum());
        if(residence!=null && residence.getParking().getParkname().equals(parking.getParkname())){
            registered = Boolean.TRUE;
        }

        // 입차 차량 중 출차 이미지가 없는 차량 중 기입된 차번호 내림차순 확인 로직
        List<CarAccess> carAccess2 = carAccessRepository.findTopByOrderByAccesscarnumDesc(carAccessTestDto.getAccesscarnum());

        if(!carAccess2.isEmpty()) {
            CarAccess carAccess3 = carAccess2.stream().findAny().get();
            valid = Boolean.TRUE;
            carAccess3.validSet("이상감지" , true);
            Detected detected = new Detected();
            detected.setCarAccess(carAccess3);
            detected.setChecked(false);
            detectedRepository.save(detected);

        }

        CarAccess carAccess = CarAccess.builder()
                .accesscarnum(carAccessTestDto.getAccesscarnum())
                .parking(parking)
                .registered(registered)
                .validation(valid)
                .inimg(carAccessTestDto.getInimg())
                .outimg(null)
                .build();


        CarAccessTestDto.savetest(carAccessRepository.save(carAccess));

        if(carAccess.getRegistered() && !carAccess.getValidation()){
            result = carAccess.getAccesscarnum();
        }


        return result;

    }
    @Transactional
    public String testDetect(CarAccessTestDto carAccessTestDto){

        CarAccess carAccess = carAccessRepository.findTopByOrderByIdDesc(carAccessTestDto.getAccesscarnum());
        String msg = "";

        if(carAccess!=null) {
            Detected detected = new Detected();
            detected.setCarAccess(carAccess);
            detected.setChecked(false);
            detectedRepository.save(detected);
            msg = "위 변조 차량이 감지되었습니다.";
        }
        else{
            msg = "위 변조 Check 결과 이상 없음";
        }
        return msg;


    }



    @Transactional(readOnly = true)
    public List<CarAccessDto> findallparkingcar(String username) {

        Account adminuser = userRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();
        List<CarAccess> carAccesses = carAccessRepository.findAllbyparkId(originUserparkid);

        return carAccesses.stream().map(CarAccessDto::findAllCar).collect(Collectors.toList());


    }


    //출차 로직
    @Transactional
    public String ExitCar(CarExitDto carExitDto) {

        Parking parking = parkingRepository.findByparkid(carExitDto.getParkid());

        List<CarAccess> carAccess2 = carAccessRepository.findTopByOrderByAccesscarnumDesc(carExitDto.getAccesscarnum());

        if(!carAccess2.isEmpty()) {

            CarAccess carAccess = carAccess2.stream().findFirst().get();

            if(carAccess.getParking().getParkname().equals(parking.getParkname()) ) {
                carAccess.ExitCar(carExitDto);

                return "출차 성공";
            }
            else {
                return "잘못된 차량 번호입니다. ( 잘못된 주차장 입력 오류 )";
            }

        }
        else {
            return "잘못된 차 번호입니다.";
        }

    }

    @Transactional
    public List<DetectedDto> findallDetected(String loginUsername) {

        Account adminuser = userRepository.findByUsername(loginUsername).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();
        List<Detected> detecteds = carAccessRepository.findByDetected(originUserparkid);
        return detecteds.stream().map(DetectedDto::findDetected).collect(Collectors.toList());
    }

    @Transactional
    public String DetectCheckCar(AbnormalitiesDetectedDto abnormalitiesDetectedDto) {

        CarAccess carAccess = carAccessRepository.findByDetectCar(abnormalitiesDetectedDto.getDetectcarnum());
        if(abnormalitiesDetectedDto.getValidation().equals(Boolean.TRUE)){
            carAccess.validSet("이상감지" , true);
            Detected detected = new Detected();
            detected.setCarAccess(carAccess);
            detected.setChecked(false);
            detectedRepository.save(detected);
            return "이상 감지 변경 완료";

        }else{
            return "이상 없음";
        }

    }


    public ParkingLotDto countEnableparkinglot(String loginUsername) {

        ParkingLotDto parkingLotDto = new ParkingLotDto();

        Account adminuser = userRepository.findByUsername(loginUsername).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();
        Long allArea = adminuser.getParkings().stream().findFirst().get().getAllarea();
        Long residentcar = carAccessRepository.countCarAccessByEnableParking(originUserparkid);
        Long nonresidentcar = carAccessRepository.countCarNonRegisterdAccessByEnableParking(originUserparkid);

        parkingLotDto.setAllparkinglot(allArea);
        parkingLotDto.setResidentparkinglot(residentcar);
        parkingLotDto.setNonparkinglot(nonresidentcar);


        return parkingLotDto;

    }

    @Transactional
    public void UpdateDetectedCheck(DetectCheckDto detectCheckDto) {


        Detected detected = detectedRepository.findById(detectCheckDto.getDetectedid()).orElseThrow(NotFoundMemberException::new);

        if(detectCheckDto.getChecked()){
            detected.UpdateDetected(detectCheckDto.getChecked());
        }




    }

    public Long CountNonCheckDetectedInfo(String loginUsername) {

        Account adminuser = userRepository.findByUsername(loginUsername).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();

        Long count;
        count = carAccessRepository.CountNonCheckDetectedInfo(originUserparkid);

        return count;

    }

    public Long CountAllCheckDetectedInfo(String loginUsername) {

        Account adminuser = userRepository.findByUsername(loginUsername).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();

        Long count;
        count = carAccessRepository.CountCheckAllDetectedInfo(originUserparkid);

        return count;

    }
}
