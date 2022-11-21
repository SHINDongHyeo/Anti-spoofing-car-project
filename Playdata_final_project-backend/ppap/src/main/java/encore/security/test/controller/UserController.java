package encore.security.test.controller;

import encore.security.test.dto.parking.ParkUpdateDto;
import encore.security.test.dto.account.UserDto;
import encore.security.test.dto.account.UserUpdateDto;
import encore.security.test.service.account.UserService;
import encore.security.test.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }

    //POST TEST
    @PostMapping("/test-redirect")
    public void testRedirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/user");
    }

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<UserDto> signup(
            @Valid @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    //내 정보
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }

    //특정 주차장의 유저 정보 찾기
    @GetMapping("/user/parking")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getMyparkingUserInfo(HttpServletRequest request ) {
        return ResponseEntity.ok(userService.findmyparkinguser(SecurityUtil.getLoginUsername()));
    }


    //유저 정보 찾기
    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));
    }

    //전체 유저 정보 찾기 SYSADMIN 권한 변경
    @GetMapping("/Alluser")
    @PreAuthorize("hasAnyRole('SYSADMIN')")
    public ResponseEntity<List<UserDto>> Alluser(@PageableDefault(size = 100)Pageable pageable){
        return ResponseEntity.ok(userService.findAllUser(pageable));
    }

    //내 정보 수정하기
    @PutMapping("/update/username")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> updateUserDto(@RequestBody @Valid UserUpdateDto userUpdateDto) {
        userService.updateUserDto(userUpdateDto , SecurityUtil.getLoginUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //유저 권한 ADMIN 추가하기 10/30일 개발완료
    @PostMapping("/user/edit/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> editUser(@PathVariable String username){
        userService.AddUserAuthority(username);
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));

    }

    // SYSADMIN 으로 권한 수정하기
    @PostMapping("/user/editsysadmin/{username}")
    @PreAuthorize("hasAnyRole('SYSADMIN')")
    public ResponseEntity<UserDto> editSysadminUser(@PathVariable String username){
        userService.AddUserSystemAuthority(username);
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));

    }

    //주차장 등록하기
    @PostMapping("/user/addpark/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> addpark(@PathVariable String username , @RequestBody @Valid ParkUpdateDto parkUpdateDto){
        userService.AddUserparkname(parkUpdateDto, username);
        return ResponseEntity.ok(userService.getUserWithAuthorities(username));

    }

    //유저 삭제하기 ( 주차장에 등록된 유저만 삭제 가능합니다. )
    @DeleteMapping("/user/delete/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> DeleteUser(@PathVariable String username){

        String msg = userService.DeleteUser(username , SecurityUtil.getLoginUsername());
        return  ResponseEntity.ok(msg);


    }


}
