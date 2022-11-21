package encore.security.test.controller;

import encore.security.test.dto.residence.*;
import encore.security.test.service.ResidentAllService;
import encore.security.test.util.SecurityUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController // REST API + Controller [ 타 API와 ( React , 외부의 특정 서버 ) ->
@RequestMapping("/api")
public class ResidentAllController {

    private final ResidentAllService residentAllService;



    public ResidentAllController(ResidentAllService residentAllService){
        this.residentAllService = residentAllService;
    }

    // 정기권 그룹 등록
    @PostMapping("/register/residentgroup")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ResidentGroupDto> registerResidentGroup(
            @Valid @RequestBody ResidentGroupDto residentGroupDto
    ) {
        return ResponseEntity.ok(residentAllService.registerResidentgroup(residentGroupDto)); //HTTP 200 -> OK
    }


    //정기권 그룹 조회
    @GetMapping("/findresidentgroup")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<ResidentGroupDto>> findAllResidentGroup(){
        return ResponseEntity.ok(residentAllService.findAllResigrup());
    }

    //정기권 등록
    @PostMapping("/register/residence")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ResidenceDto> registerResidence(
            @Valid @RequestBody ResidenceDto residenceDto
    ) {
        return ResponseEntity.ok(residentAllService.registerResidence(residenceDto)); //HTTP 200 -> OK
    }

    //정기권 전체 리스트 조회 ( SYSADMIN 전용 )
    @GetMapping("/findresidence")
    @PreAuthorize("hasAnyRole('SYSADMIN')")
    public ResponseEntity<List<ResidenceDto>> findAllResidence(){
        return ResponseEntity.ok(residentAllService.findAllResidence());
    }

    //정기권 변경 로직 특정 주차장에 해당하는 정기권만 노출 / 수정 할 수 있도록 개선 예정
    @PutMapping("/residence/update")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> UpdateResidence(
            @Valid @RequestBody ResidenceUpdateDto residenceUpdateDto
            ){
        residentAllService.updateResidence(residenceUpdateDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    //정기권 그룹 수정 특정 주차장에 해당하는 정기권 그룹만 노출 / 수정 할 수 있도록 개선 예정
    @PutMapping("/regidentgroup/update")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> UpdateResidentGroup(
            @Valid @RequestBody ResidentGroupUpdateDto residentGroupUpdateDto
    ){
        residentAllService.updateRegidentGroup(residentGroupUpdateDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    //정기권 삭제 특정 주차장에 해당하는 정기권 노출 필요
    @DeleteMapping("/residence/delete")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> DeleteResidence(
            @Valid @RequestBody ResidenceCheckDto residenceCheckDto
            ){

        String msg = residentAllService.deleteResidence(residenceCheckDto, SecurityUtil.getLoginUsername());
        return ResponseEntity.ok(msg);
    }

    //등록 정기권 그룹 삭제
    @DeleteMapping("/residentgroup/delete")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> DeleteResidentGroup(
            @Valid @RequestBody ResidentGroupDeleteDto residentGroupDeleteDto
    ){

        String msg = residentAllService.deleteResidentGroup(residentGroupDeleteDto , SecurityUtil.getLoginUsername());
        return ResponseEntity.ok(msg);
    }

    //특정 주차장의 정기권 조회
    @GetMapping("/findparking/residence")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<ResidenceDto>> findMyResidence(HttpServletRequest request){

        return ResponseEntity.ok(residentAllService.findmyresidence(SecurityUtil.getLoginUsername()));

    }

    //특정 주차장의 정기권 그룹 조회
    @GetMapping("/findparking/resident")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<ResidentGroupDto>> findMyResidentGroup(){

        return ResponseEntity.ok(residentAllService.findmyResidentGroup(SecurityUtil.getLoginUsername()));

    }






}
