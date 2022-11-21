package encore.security.test.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "detected")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Detected {

    @Id
    @Column(name = "detectedid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long detectedid;

    //순환 참조 방지를 위한 JsonBackReference
    @JsonBackReference
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Accessid")
    private CarAccess carAccess;

    @Column(name = "checked" )
    private Boolean checked;



    public void UpdateDetected(Boolean detecedCheck){

        this.checked = detecedCheck;


    }









}
