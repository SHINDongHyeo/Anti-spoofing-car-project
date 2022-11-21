package encore.security.test.service.account;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import encore.security.test.dto.parking.ParkUpdateDto;
import encore.security.test.dto.account.UserUpdateDto;
import encore.security.test.entity.Parking;
import encore.security.test.exception.DuplicateMemberException;
import encore.security.test.exception.NotFoundMemberException;
import encore.security.test.dto.account.UserDto;
import encore.security.test.entity.Authority;
import encore.security.test.entity.Account;
import encore.security.test.repository.AuthorityRepository;
import encore.security.test.repository.ParkingRepository;
import encore.security.test.repository.UserRepository;
import encore.security.test.util.SecurityUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;
    private final ParkingRepository parkingRepository;

    private final Integer MAX_VALUE = 20;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository , ParkingRepository parkingRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.parkingRepository = parkingRepository;
    }

    @Transactional
    public UserDto signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        Authority authority =  authorityRepository.findByName("ROLE_USER");


        Parking parking = parkingRepository.findByName("test");

        Account account = Account.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .company(userDto.getCompany())
                .phone(userDto.getPhone())
                .email(userDto.getEmail())
                .authorities(Collections.singleton(authority))
                .parkings(Collections.singleton(parking))
                .activated(true)
                .build();


        return UserDto.from(userRepository.save(account));
    }

    //특정 주차장 사용 유저 검색
    @Transactional(readOnly = true)
    public List<UserDto> findmyparkinguser(String username){
        Account originUser = userRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new);
        String originUserparkname =  originUser.getParkings().stream().findFirst().get().getParkname();
        List<Account> accounts = userRepository.findAllByparkname(originUserparkname);
        return accounts.stream().map(UserDto::from).collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String username) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByUsername(username).orElse(null));
    }

    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        return UserDto.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneWithAuthoritiesByUsername)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }

    public List<UserDto> findAllUser(Pageable pageable) {

        List<Account> users = userRepository.findByUsernametoedit(pageable);


        return users.stream().map(UserDto::from).collect(Collectors.toList());
    }
    // 유저 이름 변경 로직
    @Transactional
    public void updateUserDto(UserUpdateDto userUpdateDto,String username) {

        Account originUser = userRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new);

        if (userUpdateDto.getPhone().isEmpty()) {
            userUpdateDto.setPhone(originUser.getPhone());
        }
        if (userUpdateDto.getNickname().isEmpty()) {
            userUpdateDto.setNickname(originUser.getNickname());
        }
        if (userUpdateDto.getCompany().isEmpty() ) {
            userUpdateDto.setCompany(originUser.getCompany());
        }
        if (userUpdateDto.getEmail().isEmpty()) {
            userUpdateDto.setEmail(originUser.getEmail());
        }
        if (userUpdateDto.getNew_password().isEmpty()) {
            userUpdateDto.setNew_password(originUser.getPassword());
        }

        originUser.updateUser(userUpdateDto);
        //userRepository.어쩌고 저쩌고는 String Query = "select * from table where = username "
    }

    @Transactional
    // Admin 권한은 authority Table의 4번 다른 권한이 필요한 경우 리스트 형식으로 제공하는 방안을 생각해 봐야함
    public void AddUserAuthority(String username) {

        Account originUser = userRepository.findOneWithAuthoritiesByUsername(username).orElseThrow(NotFoundMemberException::new);
        Authority roleAdmin = new Authority(2L);
        originUser.addAuthorities(roleAdmin);
        userRepository.save(originUser);

    }

    @Transactional
    public void AddUserSystemAuthority(String username) {

        Account originUser = userRepository.findOneWithAuthoritiesByUsername(username).orElseThrow(NotFoundMemberException::new);
        Authority roleAdmin = new Authority(3L);
        originUser.addAuthorities(roleAdmin);
        userRepository.save(originUser);

    }

    @Transactional
    public void AddUserparkname(ParkUpdateDto parkUpdateDto, String username) {

        Account originUser = userRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new);
        String originparkname = originUser.getParkings().stream().findFirst().get().getParkname();
        Parking deleteparkname = parkingRepository.findByName(originparkname);
        originUser.deleteparking(deleteparkname);
        Parking addParkname = parkingRepository.findByName(parkUpdateDto.getParkname());
        originUser.addparkings(addParkname);
        userRepository.save(originUser);

    }

    @Transactional
    public String DeleteUser(String username , String loginuser){

        Account originUser = userRepository.findByUsername(username).orElseThrow(NotFoundMemberException::new);
        String originUserparkname =  originUser.getParkings().stream().findFirst().get().getParkname();
        Account adminuser = userRepository.findByUsername(loginuser).orElseThrow(NotFoundMemberException::new);
        String adminUserparkname = adminuser.getParkings().stream().findFirst().get().getParkname();

        if (originUser.getAuthorities().stream().anyMatch(roleid -> roleid.getAuthorityName().equals("ROLE_ADMIN") || roleid.getAuthorityName().equals("ROLE_SYSADMIN"))
        ){
            return "ADMIN과 SYSADMIN의 권한 삭제는 귀하의 권한으로 불가합니다.";
        }
        else if (!originUserparkname.equals(adminUserparkname)) {

            return "등록 주차장이 다른 경우 삭제 할 수 없습니다.";

        }else {
            Long del_userid = originUser.getAccount_id();
            userRepository.deleteById(del_userid);
            return "삭제 완료";
        }


    }




}