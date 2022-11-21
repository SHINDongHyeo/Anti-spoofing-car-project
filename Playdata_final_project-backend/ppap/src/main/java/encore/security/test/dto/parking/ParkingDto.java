package encore.security.test.dto.parking;

import encore.security.test.entity.Parking;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParkingDto {

    private Long parkid;
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

    public static ParkingDto toSaveParkingEntity(Parking parking){
        if(parking == null) return null;

        return ParkingDto.builder()
                .parkid(parking.getParking_id())
                .parkname(parking.getParkname())
                .building(parking.getBuilding())
                .address(parking.getAddress())
                .freetime(parking.getFreetime())
                .baserate(parking.getBaserate())
                .eleccharger(parking.getEleccharger())
                .starttime(parking.getStarttime())
                .allarea(parking.getAllarea())
                .enablearea(parking.getEnablearea())
                .endtime(parking.getEndtime())
                .build();

    }


}

