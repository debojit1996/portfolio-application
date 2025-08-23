package com.portfolio.service;

import com.portfolio.dto.ContactMessageDTO;
import com.portfolio.dto.EducationDTO;
import com.portfolio.dto.ExperienceDTO;
import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.dto.ProjectDTO;
import com.portfolio.dto.SkillDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.entity.ContactMessage;
import com.portfolio.entity.Education;
import com.portfolio.entity.Experience;
import com.portfolio.entity.Project;
import com.portfolio.entity.Skill;
import com.portfolio.entity.User;
import com.portfolio.mapper.EntityDTOMapper;
import com.portfolio.repository.ContactMessageRepository;
import com.portfolio.repository.EducationRepository;
import com.portfolio.repository.ExperienceRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import com.portfolio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Main Portfolio Service
 * Handles all portfolio-related operations
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PortfolioService {

    private final UserRepository userRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final EducationRepository educationRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final EntityDTOMapper entityDTOMapper;

    /**
     * Get user experiences
     *
     * @param userId User ID
     * @return List of ExperienceDTO
     */
    @Transactional(readOnly = true)
    public List<ExperienceDTO> getUserExperience(Long userId) {
        log.info("Fetching experiences for user: {}", userId);

        try {
            List<Experience> experiences = experienceRepository.findExperiencesByUserIdOrderByDate(userId);
            log.debug("Found {} experiences for user {}", experiences.size(), userId);

            return experiences.stream()
                    .map(entityDTOMapper::toExperienceDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching experiences for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch experiences", e);
        }
    }

    /**
     * Get current user experiences
     *
     * @param userId User ID
     * @return List of current ExperienceDTO
     */
    @Transactional(readOnly = true)
    public List<ExperienceDTO> getCurrentExperiences(Long userId) {
        log.info("Fetching current experiences for user: {}", userId);

        try {
            List<Experience> currentExperiences = experienceRepository.findCurrentExperiencesByUserId(userId);
            log.debug("Found {} current experiences for user {}", currentExperiences.size(), userId);

            return currentExperiences.stream()
                    .map(entityDTOMapper::toExperienceDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching current experiences for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch current experiences", e);
        }
    }

    /**
     * Get user projects
     *
     * @param userId User ID
     * @return List of ProjectDTO
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> getUserProjects(Long userId) {
        log.info("Fetching projects for user: {}", userId);

        try {
            List<Project> projects = projectRepository.findProjectsByUserIdOrderByDate(userId);
            log.debug("Found {} projects for user {}", projects.size(), userId);

            return projects.stream()
                    .map(entityDTOMapper::toProjectDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching projects for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch projects", e);
        }
    }

    /**
     * Get user skills
     *
     * @param userId User ID
     * @return List of SkillDTO
     */
    @Transactional(readOnly = true)
    public List<SkillDTO> getUserSkills(Long userId) {
        log.info("Fetching skills for user: {}", userId);

        try {
            List<Skill> skills = skillRepository.findSkillsByUserIdGroupedByCategory(userId);
            log.debug("Found {} skills for user {}", skills.size(), userId);

            return skills.stream()
                    .map(entityDTOMapper::toSkillDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching skills for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch skills", e);
        }
    }

    /**
     * Get featured skills
     *
     * @param userId User ID
     * @return List of featured SkillDTO
     */
    @Transactional(readOnly = true)
    public List<SkillDTO> getFeaturedSkills(Long userId) {
        log.info("Fetching featured skills for user: {}", userId);

        try {
            List<Skill> featuredSkills = skillRepository.findFeaturedSkillsByUserId(userId);
            log.debug("Found {} featured skills for user {}", featuredSkills.size(), userId);

            return featuredSkills.stream()
                    .map(entityDTOMapper::toSkillDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching featured skills for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch featured skills", e);
        }
    }

    /**
     * Get skill categories
     *
     * @param userId User ID
     * @return List of skill categories
     */
    @Transactional(readOnly = true)
    public List<String> getSkillCategories(Long userId) {
        log.info("Fetching skill categories for user: {}", userId);

        try {
            List<String> categories = skillRepository.findDistinctCategoriesByUserId(userId);
            log.debug("Found {} skill categories for user {}", categories.size(), userId);
            return categories;
        } catch (Exception e) {
            log.error("Error fetching skill categories for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch skill categories", e);
        }
    }

    /**
     * Get user education
     *
     * @param userId User ID
     * @return List of EducationDTO
     */
    @Transactional(readOnly = true)
    public List<EducationDTO> getUserEducation(Long userId) {
        log.info("Fetching education for user: {}", userId);

        try {
            List<Education> educations = educationRepository.findEducationByUserIdOrderByDate(userId);
            log.debug("Found {} education records for user {}", educations.size(), userId);

            return educations.stream()
                    .map(entityDTOMapper::toEducationDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching education for user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch education", e);
        }
    }

    /**
     * Submit contact message
     *
     * @param contactMessageDTO Contact message data
     * @return Saved ContactMessageDTO
     */
    public ContactMessageDTO submitContactMessage(ContactMessageDTO contactMessageDTO) {
        log.info("Processing contact message from: {} ({})", contactMessageDTO.getName(), contactMessageDTO.getEmail());

        try {
            ContactMessage contactMessage = entityDTOMapper.toContactMessage(contactMessageDTO);
            contactMessage.setSentDate(LocalDateTime.now());
            contactMessage.setIsRead(false);

            ContactMessage savedMessage = contactMessageRepository.save(contactMessage);
            log.info("Contact message saved successfully with ID: {}", savedMessage.getMessageId());

            return entityDTOMapper.toContactMessageDTO(savedMessage);
        } catch (Exception e) {
            log.error("Error saving contact message from {}: {}", contactMessageDTO.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Failed to submit contact message", e);
        }
    }

    /**
     * Get portfolio summary
     *
     * @return PortfolioSummaryDTO
     */
    @Transactional(readOnly = true)
    public Optional<PortfolioSummaryDTO> getPortfolioSummary() {
        log.info("Fetching portfolio summary");

        try {
            Optional<User> activeUser = userRepository.findActiveUser();

            if (activeUser.isPresent()) {
                User user = activeUser.get();

                // Count related records
                int experienceCount = experienceRepository.findExperiencesByUserIdOrderByDate(user.getUserId()).size();
                int projectCount = projectRepository.findProjectsByUserIdOrderByDate(user.getUserId()).size();
                int skillCount = skillRepository.findSkillsByUserIdGroupedByCategory(user.getUserId()).size();
                int educationCount = educationRepository.findEducationByUserIdOrderByDate(user.getUserId()).size();

                PortfolioSummaryDTO summary = new PortfolioSummaryDTO(
                        user.getFullName(),
                        user.getEmail(),
                        user.getBio(),
                        user.getProfileImage(),
                        experienceCount,
                        projectCount,
                        skillCount,
                        educationCount
                );

                log.debug("Portfolio summary created - Experiences: {}, Projects: {}, Skills: {}, Education: {}",
                        experienceCount, projectCount, skillCount, educationCount);

                return Optional.of(summary);
            } else {
                log.warn("No active user found for portfolio summary");
                return Optional.empty();
            }
        } catch (Exception e) {
            log.error("Error fetching portfolio summary: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch portfolio summary", e);
        }
    }

    /**
     * Get all contact messages (Admin function)
     *
     * @return List of ContactMessageDTO
     */
    @Transactional(readOnly = true)
    public List<ContactMessageDTO> getAllContactMessages() {
        log.info("Fetching all contact messages");

        try {
            List<ContactMessage> messages = contactMessageRepository.findAllByOrderBySentDateDesc();
            log.debug("Found {} contact messages", messages.size());

            return messages.stream()
                    .map(entityDTOMapper::toContactMessageDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error fetching contact messages: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch contact messages", e);
        }
    }

    /**
     * Get unread contact messages count
     *
     * @return Number of unread messages
     */
    @Transactional(readOnly = true)
    public long getUnreadMessagesCount() {
        log.debug("Fetching unread messages count");

        try {
            long count = contactMessageRepository.countByIsReadFalse();
            log.debug("Found {} unread messages", count);
            return count;
        } catch (Exception e) {
            log.error("Error fetching unread messages count: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch unread messages count", e);
        }
    }

    /**
     * Health check for portfolio service
     *
     * @return true if service is healthy
     */
    @Transactional(readOnly = true)
    public boolean healthCheck() {
        log.debug("Performing portfolio service health check");

        try {
            // Check if we can access the database
            long userCount = userRepository.count();
            log.debug("Portfolio service health check passed - {} users in system", userCount);
            return true;
        } catch (Exception e) {
            log.error("Portfolio service health check failed: {}", e.getMessage(), e);
            return false;
        }
    }
}
