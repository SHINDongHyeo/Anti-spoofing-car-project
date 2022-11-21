package encore.security.test.dto.caraccess;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarExitDto {

    private String accesscarnum;

    private Long parkid;

    private String outimg;

}
