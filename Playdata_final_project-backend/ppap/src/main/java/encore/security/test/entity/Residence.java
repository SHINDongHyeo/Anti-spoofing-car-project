package encore.security.test.entity;

import encore.security.test.dto.residence.ResidenceUpdateDto;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "Residence")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Residence{

    @Id
    @Column(name = "residenceid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long residenceid;

    @Column(name = "carnum")
    private String carnum;

    @Column(name = "owner", length = 20 )
    private String owner;

    @UpdateTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "startdate")
    private LocalDate startdate = LocalDate.now();


    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "enddate")
    private LocalDate enddate;

    @Column(name = "usestate" , nullable = false, columnDefinition = "tinyint default false")
    private Boolean usestate = false;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "secondphone", length = 20)
    private String secondphone;

    @Column(name ="resiaddress", length = 20)
    private String resiaddress;

    @Column(name = "feature")
    private String feature;

    @Column(name = "carpicture")
    private String carpicture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="groupcode")
    private ResidentGroup residentGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="parking_id")
    private Parking parking;

    public void setParking(Parking parking){
        this.parking = parking;
    }

    public void setResidentGroup(ResidentGroup residentGroup) {
        this.residentGroup = residentGroup;
    }

    public void updateResidence(ResidenceUpdateDto residenceUpdateDto){
        this.carnum = residenceUpdateDto.getNewcarnum();
        this.feature = residenceUpdateDto.getFeature();
        this.owner = residenceUpdateDto.getOwner();
        this.phone = residenceUpdateDto.getPhone();
        this.resiaddress = residenceUpdateDto.getResiaddress();
        this.secondphone = residenceUpdateDto.getSecondphone();
        this.usestate = Boolean.TRUE;
        this.enddate = residenceUpdateDto.getEnddate();
    }

}
