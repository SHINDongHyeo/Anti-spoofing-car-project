package encore.security.test.dto.caraccess;



import encore.security.test.entity.CarAccess;
import encore.security.test.entity.Detected;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

//
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class CarAccessDto {

    private Long accessid;
    @NonNull
    private String accesscarnum;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime intime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime outime;

    private Boolean validation;

    private String inimg;

    private String outimg;

    private Boolean registered;

    private Long parkid;

    private Detected detected;




    public static CarAccessDto toSaveCarAccessEntity(CarAccess carAccess){
        if(carAccess==null) return null;

        return CarAccessDto.builder()
                .accesscarnum(carAccess.getAccesscarnum())
                .outime(carAccess.getOutime())
                .inimg(carAccess.getInimg())
                .outimg(carAccess.getOutimg())
                .parkid(carAccess.getParking().getParking_id())
                .validation(carAccess.getValidation())
                .registered(carAccess.getRegistered())
                .intime(carAccess.getIntime())
                .build();


    }


    public static CarAccessDto findAllCar(CarAccess carAccess){
        return new CarAccessDto(
                carAccess.getAccessid(),
                carAccess.getAccesscarnum(),
                carAccess.getIntime(),
                carAccess.getOutime(),
                carAccess.getValidation(),
                carAccess.getInimg(),
                carAccess.getOutimg(),
                carAccess.getRegistered(),
                carAccess.getParking().getParking_id(),
                carAccess.getDetected());


    }




}
