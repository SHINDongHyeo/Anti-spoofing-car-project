package encore.security.test.dto.account;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {

    @Size(min = 3, max = 50)
    private String nickname;

    @Email
    @Size(min = 3, max = 50)
    private String email;

    @Size(min = 1, max = 20)
    private String company;

    @Size(min = 3, max = 20)
    private String phone;

    @Size(min = 3, max = 100)
    private String new_password;



}


