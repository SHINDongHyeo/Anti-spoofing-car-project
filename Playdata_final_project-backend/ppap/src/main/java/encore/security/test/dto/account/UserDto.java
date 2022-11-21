package encore.security.test.dto.account;

import com.fasterxml.jackson.annotation.JsonProperty;
import encore.security.test.dto.parking.ParkingDto;
import lombok.*;
import encore.security.test.entity.Account;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {


   @NotNull
   @Size(min = 3, max = 50)
   private String username;

   @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
   @NotNull
   @Size(min = 3, max = 100)
   private String password;

   @NotNull
   @Size(min = 3, max = 50)
   private String nickname;

   @Email
   @NotNull
   @Size(min = 3, max = 50)
   private String email;

   @NotNull
   @Size(min = 1, max = 20)
   private String company;

   @NotNull
   @Size(min = 3, max = 20)
   private String phone;

   private Set<AuthorityDto> authorityDtoSet = new HashSet<>();

   private Set<ParkingDto> parkingDtoSet;

   public static UserDto from(Account account) {
      if(account == null) return null;

      return UserDto.builder()
              .username(account.getUsername())
              .nickname(account.getNickname())
              .company(account.getCompany())
              .email(account.getEmail())
              .phone(account.getPhone())
              .authorityDtoSet(account.getAuthorities().stream()
                      .map(authority -> AuthorityDto.builder().authority_name(authority.getAuthorityName()).build())
                      .collect(Collectors.toSet()))
              .parkingDtoSet(account.getParkings().stream()
                      .map(parking -> ParkingDto.builder()
                              .parkid(parking.getParking_id())
                              .parkname(parking.getParkname())
                              .building(parking.getBuilding())
                              .address(parking.getAddress())
                              .freetime(parking.getFreetime())
                              .enablearea(parking.getEnablearea())
                              .allarea(parking.getAllarea())
                              .endtime(parking.getEndtime())
                              .starttime(parking.getStarttime())
                              .baserate(parking.getBaserate())
                              .eleccharger(parking.getEleccharger())
                              .build()
                      )
                      .collect(Collectors.toSet()))
              .build();



   }
}