package encore.security.test.controller;


import encore.security.test.dto.caraccess.*;
import encore.security.test.exception.ExceptionMessages;
import encore.security.test.exception.MqttException;
import encore.security.test.service.CarAccessService;
import encore.security.test.util.MqttUtil;
import encore.security.test.util.SecurityUtil;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

//
@RestController
@RequestMapping("/api")
public class CarAccessController {


    private CarAccessService carAccessService;


    public CarAccessController(CarAccessService carAccessService ){
        this.carAccessService = carAccessService;
    }

    // 입차 등록 메서드 ( React 에서는 해당 URL로의 접근을 불허합니다. (TEST 가능)
    @PostMapping("/register/caraccess")
    public ResponseEntity<String> registerCarAcess(

            @Valid @RequestBody CarAccessTestDto carAccessTestDto , BindingResult bindingResult)
            throws org.eclipse.paho.client.mqttv3.MqttException
    {


            if (bindingResult.hasErrors()) {

                throw new MqttException(ExceptionMessages.SOME_PARAMETERS_INVALID);

            }

            MqttMessage mqttMessage = new MqttMessage("1".getBytes());
            mqttMessage.setQos(1);
            mqttMessage.setRetained(false);

            MqttUtil.getInstance().publish("breaker_in", mqttMessage);

            String validationcar = carAccessService.testCarAccess(carAccessTestDto);


            return ResponseEntity.ok(validationcar);

    }

    // 출차 Listen ( Front에서의 접근을 불허함 추후 Security Logic을 통해 보완 예정 )
    @PutMapping("/register/carexit")
    public ResponseEntity<String> registerCarExit(
            @Valid @RequestBody CarExitDto carExitDto , BindingResult bindingResult)
            throws org.eclipse.paho.client.mqttv3.MqttException
    {


        if (bindingResult.hasErrors()) {
            throw new MqttException(ExceptionMessages.SOME_PARAMETERS_INVALID);
        }

        MqttMessage mqttMessage = new MqttMessage("1".getBytes());
        mqttMessage.setQos(1);
        mqttMessage.setRetained(false);

        MqttUtil.getInstance().publish("breaker_in", mqttMessage);
        String msg = carAccessService.ExitCar(carExitDto);

        return ResponseEntity.ok(msg);

    }

    //인공지능을 통한 이상감지 확인 로직
    @PostMapping("/detected/accesscar")
    public ResponseEntity<String> detectedAccesscar(@Valid @RequestBody AbnormalitiesDetectedDto abnormalitiesDetectedDto){

        String msg = carAccessService.DetectCheckCar(abnormalitiesDetectedDto);

        return ResponseEntity.ok(msg);


    }


    @GetMapping("/findallaccesscar")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<List<CarAccessDto>> findAllCar(){
        return ResponseEntity.ok(carAccessService.findAllCar());
    }

    // 주차장 별 입출차 내역 확인 로직
    @GetMapping("/findparkingaccesscar")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<CarAccessDto>> findAllParkingCar(){
        return ResponseEntity.ok(carAccessService.findallparkingcar(SecurityUtil.getLoginUsername()));
    }

    // 주차장 별 이상감지 내역
    @GetMapping("/findparkingdetected")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<DetectedDto>> findAllParkingDetected(){
        return ResponseEntity.ok(carAccessService.findallDetected(SecurityUtil.getLoginUsername()));
    }

    // 알람 발의 Check Confirm 시 Detected Table Check Alarm 변경 로직
    @PutMapping("/updatecheck")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> updateDetectedChecking(@Valid @RequestBody DetectCheckDto detectCheckDto){
        carAccessService.UpdateDetectedCheck(detectCheckDto);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    //알람 감지 확인 로직
    @GetMapping("/checkalarm")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countNonCheckDetectedInfo(){
        return ResponseEntity.ok(carAccessService.CountNonCheckDetectedInfo(SecurityUtil.getLoginUsername()));
    }

    // 전체 알람 확인 로직
    @GetMapping("/checkall")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Long> countCheckAllDetectedInfo(){
        return ResponseEntity.ok(carAccessService.CountAllCheckDetectedInfo(SecurityUtil.getLoginUsername()));
    }


    //전체 주차 공간 , 등록차 주차 수 , 미등록차 주차 수
    @GetMapping("/enableparkinglot")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ParkingLotDto> EnableParkinglot(){

        ParkingLotDto Enableparkinglot = carAccessService.countEnableparkinglot(SecurityUtil.getLoginUsername());
        return ResponseEntity.ok(Enableparkinglot);

    }

}
