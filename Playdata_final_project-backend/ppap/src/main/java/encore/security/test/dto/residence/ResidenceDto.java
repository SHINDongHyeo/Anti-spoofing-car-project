package encore.security.test.dto.residence;



import encore.security.test.entity.Residence;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResidenceDto {

    @NotNull
    private String carnum;

    private String owner;

    private String phone;

    private String secondphone;

    private String resiaddress;

    private String feature;

    private String groupcode;

    private Long parking_id;

    private Boolean usestate;


    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate enddate;

    public static ResidenceDto toSaveResidenceEntity(Residence residence){
        if(residence == null) return null;

        return ResidenceDto.builder()
                .carnum(residence.getCarnum())
                .owner(residence.getOwner())
                .phone(residence.getPhone())
                .secondphone(residence.getSecondphone())
                .resiaddress(residence.getResiaddress())
                .feature(residence.getFeature())
                .groupcode(residence.getResidentGroup().getGroupcode())
                .parking_id(residence.getParking().getParking_id())
                .enddate(residence.getEnddate())
                .usestate(residence.getUsestate())
                .build();

    }

    public static ResidenceDto findResidence(Residence residence){

        return new ResidenceDto(
                residence.getCarnum(),
                residence.getOwner(),
                residence.getPhone(),
                residence.getSecondphone(),
                residence.getResiaddress(),
                residence.getFeature(),
                residence.getResidentGroup().getGroupcode(),
                residence.getParking().getParking_id(),
                residence.getUsestate(),
                residence.getEnddate());




    }

}
