package encore.security.test.repository;


import encore.security.test.entity.ResidentGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResidentGroupRepository extends JpaRepository<ResidentGroup , String> {

    @Query("SELECT rg from ResidentGroup rg where rg.groupcode =?1")
    public ResidentGroup findByCode(String groupcode);
    @Query("SELECT rg from ResidentGroup rg where rg.groupname = ?1")
    public ResidentGroup findByName(String groupname);
    @Query("SELECT rg from ResidentGroup rg where rg.parking.parking_id= ?1")
    List<ResidentGroup> findAllbyparkId(Long originUserparkid);
}
