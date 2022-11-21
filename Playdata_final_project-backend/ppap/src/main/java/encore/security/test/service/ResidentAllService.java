package encore.security.test.service;

import encore.security.test.dto.residence.*;
import encore.security.test.entity.Account;
import encore.security.test.entity.Parking;
import encore.security.test.entity.Residence;
import encore.security.test.entity.ResidentGroup;
import encore.security.test.exception.DuplicateMemberException;
import encore.security.test.exception.NotFoundMemberException;
import encore.security.test.repository.ParkingRepository;
import encore.security.test.repository.ResidenceRepository;
import encore.security.test.repository.ResidentGroupRepository;
import encore.security.test.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResidentAllService {

    private final ResidentGroupRepository residentGroupRepository;
    private final ParkingRepository parkingRepository;
    private final ResidenceRepository residenceRepository;

    private final UserRepository userRepository;



    public ResidentAllService(ResidentGroupRepository residentGroupRepository , ParkingRepository parkingRepository, ResidenceRepository residenceRepository , UserRepository userRepository) {
        this.residentGroupRepository = residentGroupRepository;
        this.parkingRepository = parkingRepository;
        this.residenceRepository = residenceRepository;
        this.userRepository = userRepository;
    }




    public List<ResidentGroupDto> findAllResigrup() {
        List<ResidentGroup> residentGroups = residentGroupRepository.findAll();
        return residentGroups.stream().map(ResidentGroupDto::findResigroup).collect(Collectors.toList());
    }

    public List<ResidenceDto> findAllResidence() {
        List<Residence> residences = residenceRepository.findAll();
        return residences.stream().map(ResidenceDto::findResidence).collect(Collectors.toList());
    }

    @Transactional
    public ResidenceDto registerResidence(ResidenceDto residenceDto){
        if (residenceRepository.findByName(residenceDto.getCarnum())!= null) {
            throw new DuplicateMemberException("이미 등록되어 있는 차량입니다.");
        }

        Parking parkname = parkingRepository.findByparkid(residenceDto.getParking_id());
        ResidentGroup residentGroup = residentGroupRepository.findByCode(residenceDto.getGroupcode());

        Residence residence = Residence.builder()
                .carnum(residenceDto.getCarnum())
                .phone(residenceDto.getPhone())
                .owner(residenceDto.getOwner())
                .secondphone(residenceDto.getSecondphone())
                .resiaddress(residenceDto.getResiaddress())
                .feature(residenceDto.getFeature())
                .parking(parkname)
                .residentGroup(residentGroup)
                .enddate(residenceDto.getEnddate())
                .usestate(Boolean.TRUE)
                .build();



        return ResidenceDto.toSaveResidenceEntity(residenceRepository.save(residence));

    }

    @Transactional
    public ResidentGroupDto registerResidentgroup(ResidentGroupDto residentGroupDto){
        if (residentGroupRepository.findById(residentGroupDto.getGroupcode()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 등록되어 있는 그룹코드입니다.");
        }

        Parking parkid = parkingRepository.findByparkid(residentGroupDto.getParkid());


        ResidentGroup residentGroup = ResidentGroup.builder()
                .groupcode(residentGroupDto.getGroupcode())
                .groupname(residentGroupDto.getGroupname())
                .totalprice(residentGroupDto.getTotalprice())
                .endtime(residentGroupDto.getEndtime())
                .parking(parkid)
                .build();

        return ResidentGroupDto.toSaveResidentGroupEntity(residentGroupRepository.save(residentGroup));

    }

    @Transactional
    public void updateResidence(ResidenceUpdateDto residenceUpdateDto) {


        Residence originresidence = residenceRepository.findByName(residenceUpdateDto.getCarnum());

        if (residenceUpdateDto.getOwner().isEmpty()) {
            residenceUpdateDto.setOwner(originresidence.getOwner());
        }
        if (residenceUpdateDto.getSecondphone().isEmpty()) {
            residenceUpdateDto.setSecondphone(originresidence.getSecondphone());
        }
        if (residenceUpdateDto.getNewcarnum().isEmpty()) {
            residenceUpdateDto.setNewcarnum(originresidence.getCarnum());
        }
        if (residenceUpdateDto.getFeature().isEmpty()) {
            residenceUpdateDto.setFeature(originresidence.getFeature());
        }
        if (residenceUpdateDto.getEnddate() == null) {
            residenceUpdateDto.setEnddate(originresidence.getEnddate());
        }
        if (residenceUpdateDto.getResiaddress().isEmpty()) {
            residenceUpdateDto.setResiaddress(originresidence.getResiaddress());
        }
        if (residenceUpdateDto.getPhone().isEmpty()) {
            residenceUpdateDto.setPhone(originresidence.getPhone());
        }


        originresidence.updateResidence(residenceUpdateDto);

    }

    @Transactional
    public void updateRegidentGroup(ResidentGroupUpdateDto residentGroupUpdateDto) {

        ResidentGroup originresidentGroup = residentGroupRepository.findByName(residentGroupUpdateDto.getGroupname());

        if (residentGroupUpdateDto.getNewgroupname().isEmpty()) {
            residentGroupUpdateDto.setNewgroupname(originresidentGroup.getGroupname());
        }
        if (residentGroupUpdateDto.getEndtime() == null) {
            residentGroupUpdateDto.setEndtime(originresidentGroup.getEndtime());
        }
        if (residentGroupUpdateDto.getTotalprice() == null) {
            residentGroupUpdateDto.setTotalprice(originresidentGroup.getTotalprice());
        }


        originresidentGroup.updateResidentGroup(residentGroupUpdateDto);


    }
    @Transactional
    public String deleteResidence(ResidenceCheckDto residenceCheckDto, String adminname) {
        Residence residence = residenceRepository.findByName(residenceCheckDto.getCarnum());
        Long park_id = residence.getParking().getParking_id();
        Account adminuser = userRepository.findByUsername(adminname).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();

        if(!originUserparkid.equals(park_id)){
            return "등록 주차장이 다른 경우 삭제 할 수 없습니다.";
        }else{
            Long del_residenceid = residence.getResidenceid();
            residenceRepository.deleteById(del_residenceid);
            return "삭제 완료";
        }
    }

    @Transactional
    public String deleteResidentGroup(ResidentGroupDeleteDto residentGroupDeleteDto, String adminname) {
        ResidentGroup residentGroup = residentGroupRepository.findByCode(residentGroupDeleteDto.getGroupcode());
        Long park_id = residentGroup.getParking().getParking_id();
        Account adminuser = userRepository.findByUsername(adminname).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();

        if(!originUserparkid.equals(park_id)){
            return "등록 주차장이 다른 경우 삭제 할 수 없습니다.";
        }else{
            String del_residentGroup = residentGroup.getGroupcode();
            residentGroupRepository.deleteById(del_residentGroup);
            return "삭제 완료";
        }

    }
    //특정 주차장 정기권 검색
    @Transactional(readOnly = true)
    public List<ResidenceDto> findmyresidence(String username){

        Account adminuser = userRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();
        List<Residence> residences = residenceRepository.findAllbyparkId(originUserparkid);
        return residences.stream().map(ResidenceDto::findResidence).collect(Collectors.toList());

    }
    @Transactional(readOnly = true)
    public List<ResidentGroupDto> findmyResidentGroup(String username) {

        Account adminuser = userRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new);
        Long originUserparkid =  adminuser.getParkings().stream().findFirst().get().getParking_id();
        List<ResidentGroup> residentGroups = residentGroupRepository.findAllbyparkId(originUserparkid);
        return residentGroups.stream().map(ResidentGroupDto::findResigroup).collect(Collectors.toList());

    }

}
