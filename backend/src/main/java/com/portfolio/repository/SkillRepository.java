package com.portfolio.repository;

import com.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Skill entity operations
 *
 * @author Debojit Chakraborty
 */
@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByUserUserIdOrderBySkillCategory(Long userId);

    @Query("SELECT s FROM Skill s WHERE s.user.userId = :userId AND s.isFeatured = true")
    List<Skill> findFeaturedSkillsByUserId(Long userId);

    @Query("SELECT s FROM Skill s WHERE s.user.userId = :userId ORDER BY s.skillCategory, s.skillName")
    List<Skill> findSkillsByUserIdGroupedByCategory(Long userId);

    @Query("SELECT DISTINCT s.skillCategory FROM Skill s WHERE s.user.userId = :userId ORDER BY s.skillCategory")
    List<String> findDistinctCategoriesByUserId(Long userId);
}
