package com.portfolio.repository;

import com.portfolio.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Education entity operations
 *
 * @author Debojit Chakraborty
 */
@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {

    List<Education> findByUserUserIdOrderByStartDateDesc(Long userId);

    @Query("SELECT e FROM Education e WHERE e.user.userId = :userId ORDER BY e.startDate DESC")
    List<Education> findEducationByUserIdOrderByDate(Long userId);
}
