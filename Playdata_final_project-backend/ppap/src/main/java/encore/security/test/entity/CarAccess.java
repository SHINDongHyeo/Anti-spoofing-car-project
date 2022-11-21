package encore.security.test.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import encore.security.test.dto.caraccess.CarExitDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "caraccess")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarAccess {

    @Id
    @Column(name = "accessid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accessid;

    @Column(name = "accesscarnum")
    private String accesscarnum;

    @CreationTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "intime")
    private LocalDateTime intime;

    @UpdateTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "outime")
    private LocalDateTime outime;

    @Column(name = "validation" , nullable = false , columnDefinition = "tinyint default false")
    private Boolean validation = false;

    @Column(name = "inimg")
    private String inimg;

    @Column(name = "outimg")
    private String outimg;

    @Column(name = "registered", nullable = false , columnDefinition = "tinyint default false")
    private Boolean registered = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="parking_id")
    private Parking parking;


    //순환 참조 방지를 위한 어노테이션
    @JsonManagedReference
    @OneToOne(mappedBy = "carAccess" , cascade = CascadeType.ALL, orphanRemoval = true)
    private Detected detected;




    public void setDetected(Detected detected){
        this.detected = detected;
    }

    public void setParking(Parking parking){
        this.parking = parking;
    }

    public void ExitCar(CarExitDto carExitDto){

        this.outimg = carExitDto.getOutimg();

    }
    public void validSet(String outimg , Boolean valid){

        this.outimg = outimg;
        this.validation = valid;

    }





}
