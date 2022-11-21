package encore.security.test.dto.caraccess;

import encore.security.test.entity.CarAccess;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarAccessTestDto {

    private String accesscarnum;

    private String inimg;

    private Long park_id;

    public static CarAccessTestDto savetest(CarAccess carAccess){
        if(carAccess==null) return null;

        return CarAccessTestDto.builder()
                .accesscarnum(carAccess.getAccesscarnum())
                .inimg(carAccess.getInimg())
                .park_id(carAccess.getParking().getParking_id())
                .build();


    }
}
