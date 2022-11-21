package encore.security.test.repository;

import encore.security.test.entity.Detected;

import org.springframework.data.jpa.repository.JpaRepository;


public interface DetectedRepository extends JpaRepository<Detected , Long> {

}
