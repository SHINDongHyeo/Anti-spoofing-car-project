package encore.security.test;


import encore.security.test.entity.Authority;
import encore.security.test.entity.Account;
import encore.security.test.repository.AuthorityRepository;
import encore.security.test.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class UserRepositoryTests {

//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private AuthorityRepository authorityRepository;
//
//    @Autowired
//    private TestEntityManager entityManager;
//
//    //@Test
//    public void testCreateUser(){
//        Account account = new Account();
//        account.setEmail("jwkim93@gmail.com");
//        account.setUsername("kml1763");
//        account.setCompany("test");
//        account.setPhone("12345");
//        account.setNickname("kimjinwon");
//        account.setPassword("12345678");
//
//        Account savedUser = userRepository.save(account);
//        Account existUser = entityManager.find(Account.class , savedUser.getAccount_id());
//
//
//    }
//
//    //@Test
//    public void testAddRoleTonewUser(){
//        Account account = new Account();
//        account.setEmail("jw439@gmail.com");
//        account.setUsername("jw439");
//        account.setCompany("jw439");
//        account.setPhone("jw439");
//        account.setNickname("jw439");
//        account.setPassword("12345678");
//
//        Authority authority =  authorityRepository.findByName("ROLE_USER");
//        account.addAuthorities(authority);
//
//        userRepository.save((account));
////        User savedUser = userRepository.save((user));
//
//
//
//    }
//    @Test
//    public void testAddRolesToExistingUser(){
//
//        Account account = userRepository.findById(1L).get();
//
//        Authority authorityuser = authorityRepository.findByName("ROLE_USER");
//        account.addAuthorities(authorityuser);
//
//        Authority roleAdmin = new Authority(2L);
//        account.addAuthorities(roleAdmin);
//
//        userRepository.save((account));
//
//    }
//
//    //@Test
//    public void testAddSysRolesToExistingUser(){
//
//        Account account = userRepository.findById(1L).get();
//
//
//        Authority SysroleAdmin = new Authority(3L);
//        account.addAuthorities(SysroleAdmin);
//
//        userRepository.save((account));
//
//    }

}
