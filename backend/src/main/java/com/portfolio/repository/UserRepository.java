package com.portfolio.repository;

import com.portfolio.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity operations
 *
 * @author Debojit Chakraborty
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.isActive = true")
    Optional<User> findActiveUser();

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.experiences " +
            "LEFT JOIN FETCH u.projects LEFT JOIN FETCH u.skills " +
            "LEFT JOIN FETCH u.educations WHERE u.userId = :userId")
    Optional<User> findUserWithAllDetails(Long userId);
}
