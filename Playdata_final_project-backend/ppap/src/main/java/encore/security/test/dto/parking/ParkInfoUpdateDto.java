package encore.security.test.dto.parking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ParkInfoUpdateDto {

    private String newparkname;

    private String parkname;

    private Long allarea;

    private String building;

    private Long eleccharger;

    private Double baserate;

    private String address;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate starttime;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endtime;

    private String freetime;



}
