package encore.security.test.entity;

import encore.security.test.dto.account.UserUpdateDto;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "account")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Account {

   @Id
   @Column(name = "account_id")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long account_id;

   @Column(name = "username", length = 50, unique = true)
   private String username;

   @Column(name = "password", length = 100)
   private String password;

   @Column(name = "nickname", length = 50)
   private String nickname;

   @Column(name = "email", length = 50)
   private String email;

   @Column(name = "company", length = 50)
   private String company;

   @Column(name = "phone", length = 50)
   private String phone;


   @Column(name = "activated")
   private boolean activated;


   // 다대다 관계에서 한쪽 테이블에 데이터가 없는데 참조 테이블을 생성하려는 경우 발생하는 Error로 Cascade 설정을 통해 해결함 10/29
   // Authority Data 빌드 시 등록된 권한 정보를 찾아 Insert 하는 방식으로 수정하여 Cascade 방식 해제 10/29

   // 데이터 지연 로딩 현상 발생으로 즉시로딩으로 변경
   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(
      name = "account_authority",
      joinColumns = {@JoinColumn(name = "account_id")},
      inverseJoinColumns = {@JoinColumn(name = "authority_id")})
   private Set<Authority> authorities = new HashSet<>();



   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(
           name = "account_parking",
           joinColumns = {@JoinColumn(name = "account_id")},
           inverseJoinColumns = {@JoinColumn(name = "parking_id")})
   private Set<Parking> parkings = new HashSet<>();



   public void updateUser(UserUpdateDto userUpdateDto) {


         this.nickname = userUpdateDto.getNickname();
         this.company = userUpdateDto.getCompany();
      this.password = passwordEncoder().encode(userUpdateDto.getNew_password());
         this.phone = userUpdateDto.getPhone();
         this.email = userUpdateDto.getEmail();


   }

   private PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }


   public void addAuthorities(Authority authority){
      this.authorities.add(authority);
   }

   public void addparkings(Parking parking){
      this.parkings.add(parking);
   }

   public void deleteparking(Parking parking) {
      this.parkings.remove(parking);
   }





}