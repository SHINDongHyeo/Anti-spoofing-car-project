package encore.security.test.entity;
import encore.security.test.dto.parking.ParkInfoUpdateDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "parking")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Parking {


    @Id
    @Column(name = "parking_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parking_id;

    @Column(name = "parkname", length = 20, unique = true)
    private String parkname;

    @Column(name = "building", length = 20)
    private String building;

    @Column(name = "address", length = 20)
    private String address;

    @Column(name = "freetime", length = 20)
    private String freetime;

    @Column(name = "baserate")
    private double baserate;

    @Column(name = "eleccharger")
    private Long eleccharger;

    @CreationTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "starttime")
    private LocalDate starttime;

    @Column(name = "allarea")
    private Long allarea;

    @Column(name = "enablearea")
    private Long enablearea;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "endtime")
    private LocalDate endtime;

    @OneToMany(cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_id")
    private List<ResidentGroup> residentGroups;

    @OneToMany(cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_id")
    private List<Residence> residences;

    @OneToMany(cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_id")
    private List<CarAccess> carAccesses;

    public void updateparking(ParkInfoUpdateDto parkInfoUpdateDto){
        this.parkname = parkInfoUpdateDto.getNewparkname();
        this.allarea = parkInfoUpdateDto.getAllarea();
        this.address = parkInfoUpdateDto.getAddress();
        this.baserate = parkInfoUpdateDto.getBaserate();
        this.building = parkInfoUpdateDto.getBuilding();
        this.eleccharger = parkInfoUpdateDto.getEleccharger();
        this.endtime = parkInfoUpdateDto.getEndtime();
        this.freetime = parkInfoUpdateDto.getFreetime();

    }








}
