package encore.security.test.dto.caraccess;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AbnormalitiesDetectedDto {

    private String detectcarnum;

    private Boolean validation;


}
