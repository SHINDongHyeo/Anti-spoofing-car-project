package encore.security.test.repository;

import encore.security.test.entity.Account;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Account, Long> {


   @Query("SELECT u from Account u ")
   public List<Account> findByUsernametoedit(Pageable pageable);

   @Query("select u from Account u join u.parkings p  where p.parkname = :parkname")
   List<Account> findAllByparkname(@Param("parkname") String parkname);


   Optional<Account> findByUsername(String username);

   @EntityGraph(attributePaths = "authorities")
   Optional<Account> findOneWithAuthoritiesByUsername(String username);





}
