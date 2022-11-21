package encore.security.test.dto.account;

import encore.security.test.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoleUpdateDto {

    private Set<Authority> authorities;

}
