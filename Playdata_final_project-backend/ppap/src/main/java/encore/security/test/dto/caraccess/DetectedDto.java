package encore.security.test.dto.caraccess;

import encore.security.test.entity.Detected;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DetectedDto {

    private String carnum;

    private Long detectedid;

    private Long CarAccess;

    private Boolean checked;

    public static DetectedDto findDetected(Detected detected){
        return new DetectedDto(
                detected.getCarAccess().getAccesscarnum(),
                detected.getCarAccess().getAccessid(),
                detected.getDetectedid(),
                detected.getChecked());

    }



}
