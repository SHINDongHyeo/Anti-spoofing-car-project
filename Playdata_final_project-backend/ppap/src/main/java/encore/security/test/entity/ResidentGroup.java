package encore.security.test.entity;



import encore.security.test.dto.residence.ResidentGroupUpdateDto;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "residentgroup")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResidentGroup {

    @Id
    @Column(name = "groupcode", length = 20)
    private String groupcode;

    @Column(name = "groupname", length = 20, unique = true)
    private String groupname;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "endtime")
    private LocalDate endtime;

    @Column(name = "totalprice")
    private Long totalprice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="parking_id")
    private Parking parking;

    @OneToMany(cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    @JoinColumn(name = "groupcode")
    private List<Residence> residences;

    public void setParking(Parking parking){
        this.parking = parking;
    }

    public void updateResidentGroup(ResidentGroupUpdateDto residentGroupUpdateDto){
        this.groupname = residentGroupUpdateDto.getNewgroupname();
        this.totalprice = residentGroupUpdateDto.getTotalprice();
        this.endtime = residentGroupUpdateDto.getEndtime();
    }







}
