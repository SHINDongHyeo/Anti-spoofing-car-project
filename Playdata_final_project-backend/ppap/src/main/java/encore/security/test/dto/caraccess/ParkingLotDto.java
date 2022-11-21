package encore.security.test.dto.caraccess;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParkingLotDto {

    private Long allparkinglot;

    private Long residentparkinglot;

    private Long nonparkinglot;


}
