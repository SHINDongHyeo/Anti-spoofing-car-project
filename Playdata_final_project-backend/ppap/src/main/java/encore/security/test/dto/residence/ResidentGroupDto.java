package encore.security.test.dto.residence;


import encore.security.test.entity.ResidentGroup;
import javax.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResidentGroupDto {

    private String parkname;
    @NotNull
    private String groupcode;

    private String groupname;

    private Long totalprice;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endtime;

    private Long parkid;









    public static ResidentGroupDto toSaveResidentGroupEntity(ResidentGroup residentGroup){
        if(residentGroup == null) return null;

        return ResidentGroupDto.builder()
                .groupcode(residentGroup.getGroupcode())
                .groupname(residentGroup.getGroupname())
                .totalprice(residentGroup.getTotalprice())
                .endtime(residentGroup.getEndtime())
                .parkid(residentGroup.getParking().getParking_id())
                .build();


    }

    public static ResidentGroupDto findResigroup(ResidentGroup residentGroup ){

        return new ResidentGroupDto(
                residentGroup.getParking().getParkname(),
                residentGroup.getGroupcode(),
                residentGroup.getGroupname(),
                residentGroup.getTotalprice(),
                residentGroup.getEndtime(),
                residentGroup.getParking().getParking_id());

    }
}