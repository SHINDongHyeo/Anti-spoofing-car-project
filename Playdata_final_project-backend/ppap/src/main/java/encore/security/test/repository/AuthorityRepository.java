package encore.security.test.repository;

import encore.security.test.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

    @Query("SELECT a from Authority a where a.authority_name = ?1")
    public Authority findByName(String name);

}
