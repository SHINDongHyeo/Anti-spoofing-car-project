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
public class ResidentGroupUpdateDto {

    private String newgroupname;

    private String groupname;

    private Long totalprice;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endtime;

}
