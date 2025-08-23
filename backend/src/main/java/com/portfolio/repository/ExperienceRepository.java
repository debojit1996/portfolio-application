package com.portfolio.repository;

import com.portfolio.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Experience entity operations
 *
 * @author Debojit Chakraborty
 */
@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    List<Experience> findByUserUserIdOrderByStartDateDesc(Long userId);

    @Query("SELECT e FROM Experience e WHERE e.user.userId = :userId ORDER BY e.startDate DESC")
    List<Experience> findExperiencesByUserIdOrderByDate(Long userId);

    @Query("SELECT e FROM Experience e WHERE e.isCurrent = true AND e.user.userId = :userId")
    List<Experience> findCurrentExperiencesByUserId(Long userId);
}
