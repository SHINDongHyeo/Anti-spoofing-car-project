package encore.security.test;


import encore.security.test.entity.Authority;
import encore.security.test.repository.AuthorityRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class RoleRepositoryTests {

//    @Autowired
//    AuthorityRepository repo;
//
//    @Test
//    public void testCreateAuthoritise(){
//        Authority user = new Authority("ROLE_USER");
//        Authority admin = new Authority("ROLE_ADMIN");
//        //Authority manager = new Authority("ROLE_MANAGER");
//        Authority sysadmin = new Authority("ROLE_SYSADMIN");
//
//        repo.saveAll(List.of(sysadmin));
//        List<Authority> listroles = repo.findAll();
//
//
//
//    }




}
