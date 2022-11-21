package encore.security.test.dto.parking;

import encore.security.test.entity.Parking;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ParkingReponseDto {

    @NotNull
    @Size(min = 3, max = 20)
    private String parkname;

    private String building;

    private String address;

    private String freetime;

    private double baserate;

    private Long eleccharger;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate starttime;

    private Long allarea;

    private Long enablearea;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endtime;


    public static ParkingReponseDto findParking(Parking parking){

        return new ParkingReponseDto(
                parking.getParkname(),
                parking.getBuilding(),
                parking.getAddress(),
                parking.getFreetime(),
                parking.getBaserate(),
                parking.getEleccharger(),
                parking.getStarttime(),
                parking.getAllarea(),
                parking.getEnablearea(),
                parking.getEndtime());

    }

}
