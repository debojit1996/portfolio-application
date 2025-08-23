package com.portfolio.repository;

import com.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Project entity operations
 *
 * @author Debojit Chakraborty
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUserUserIdOrderByStartDateDesc(Long userId);

    @Query("SELECT p FROM Project p WHERE p.user.userId = :userId ORDER BY p.startDate DESC")
    List<Project> findProjectsByUserIdOrderByDate(Long userId);

    @Query("SELECT p FROM Project p WHERE p.user.userId = :userId AND p.githubUrl IS NOT NULL")
    List<Project> findProjectsWithGithubByUserId(Long userId);

    @Query("SELECT p FROM Project p WHERE p.user.userId = :userId AND p.liveUrl IS NOT NULL")
    List<Project> findProjectsWithLiveDemoByUserId(Long userId);
}
