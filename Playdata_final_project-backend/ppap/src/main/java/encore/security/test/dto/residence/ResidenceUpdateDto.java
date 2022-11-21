package encore.security.test.dto.residence;


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
public class ResidenceUpdateDto {

    private String newcarnum;

    private String carnum;

    private String feature;

    private String owner;

    private String phone;

    private String resiaddress;

    private String secondphone;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate enddate;


}
