package encore.security.test.dto.caraccess;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetectCheckDto {

    private Long detectedid;

    private Boolean checked;


}
