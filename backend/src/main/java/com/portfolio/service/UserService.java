package com.portfolio.service;

import com.portfolio.dto.UserDTO;
import com.portfolio.entity.User;
import com.portfolio.mapper.EntityDTOMapper;
import com.portfolio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Service class for User operations
 * Handles user management and profile operations
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final EntityDTOMapper entityDTOMapper;

    /**
     * Get active user profile
     *
     * @return UserDTO of active user
     */
    @Transactional(readOnly = true)
    public Optional<UserDTO> getActiveUser() {
        log.info("Fetching active user profile");

        try {
            Optional<User> activeUser = userRepository.findActiveUser();

            if (activeUser.isPresent()) {
                log.debug("Active user found: {}", activeUser.get().getEmail());
                UserDTO userDTO = entityDTOMapper.toUserDTO(activeUser.get());
                return Optional.of(userDTO);
            } else {
                log.warn("No active user found in the system");
                return Optional.empty();
            }
        } catch (Exception e) {
            log.error("Error fetching active user: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to fetch active user", e);
        }
    }

    /**
     * Get user by ID
     *
     * @param userId User ID
     * @return UserDTO
     */
    @Transactional(readOnly = true)
    public Optional<UserDTO> getUserById(Long userId) {
        log.info("Fetching user by ID: {}", userId);

        try {
            Optional<User> user = userRepository.findById(userId);

            if (user.isPresent()) {
                log.debug("User found: {} ({})", user.get().getFullName(), user.get().getEmail());
                UserDTO userDTO = entityDTOMapper.toUserDTO(user.get());
                return Optional.of(userDTO);
            } else {
                log.warn("User not found with ID: {}", userId);
                return Optional.empty();
            }
        } catch (Exception e) {
            log.error("Error fetching user by ID {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch user", e);
        }
    }

    /**
     * Get user with all details (experiences, projects, skills, education)
     *
     * @param userId User ID
     * @return UserDTO with all related data
     */
    @Transactional(readOnly = true)
    public Optional<UserDTO> getUserWithAllDetails(Long userId) {
        log.info("Fetching user with all details for ID: {}", userId);

        try {
            Optional<User> user = userRepository.findUserWithAllDetails(userId);

            if (user.isPresent()) {
                log.debug("User with details found: {} - Experiences: {}, Projects: {}, Skills: {}, Education: {}",
                        user.get().getFullName(),
                        user.get().getExperiences() != null ? user.get().getExperiences().size() : 0,
                        user.get().getProjects() != null ? user.get().getProjects().size() : 0,
                        user.get().getSkills() != null ? user.get().getSkills().size() : 0,
                        user.get().getEducations() != null ? user.get().getEducations().size() : 0);

                UserDTO userDTO = entityDTOMapper.toUserDTOWithDetails(user.get());
                return Optional.of(userDTO);
            } else {
                log.warn("User not found with ID: {}", userId);
                return Optional.empty();
            }
        } catch (Exception e) {
            log.error("Error fetching user with details for ID {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch user details", e);
        }
    }

    /**
     * Check if email exists
     *
     * @param email Email to check
     * @return true if email exists
     */
    @Transactional(readOnly = true)
    public boolean emailExists(String email) {
        log.debug("Checking if email exists: {}", email);

        try {
            boolean exists = userRepository.existsByEmail(email);
            log.debug("Email {} exists: {}", email, exists);
            return exists;
        } catch (Exception e) {
            log.error("Error checking email existence for {}: {}", email, e.getMessage(), e);
            throw new RuntimeException("Failed to check email", e);
        }
    }

    /**
     * Create new user
     *
     * @param userDTO User data
     * @return Created UserDTO
     */
    public UserDTO createUser(UserDTO userDTO) {
        log.info("Creating new user: {}", userDTO.getEmail());

        try {
            // Check if email already exists
            if (emailExists(userDTO.getEmail())) {
                log.warn("Attempt to create user with existing email: {}", userDTO.getEmail());
                throw new IllegalArgumentException("Email already exists: " + userDTO.getEmail());
            }

            User user = entityDTOMapper.toUser(userDTO);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());

            User savedUser = userRepository.save(user);
            log.info("User created successfully: {} (ID: {})", savedUser.getEmail(), savedUser.getUserId());

            return entityDTOMapper.toUserDTO(savedUser);
        } catch (Exception e) {
            log.error("Error creating user {}: {}", userDTO.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Failed to create user", e);
        }
    }

    /**
     * Update user profile
     *
     * @param userId User ID
     * @param userDTO Updated user data
     * @return Updated UserDTO
     */
    public Optional<UserDTO> updateUser(Long userId, UserDTO userDTO) {
        log.info("Updating user: {}", userId);

        try {
            Optional<User> existingUser = userRepository.findById(userId);

            if (existingUser.isPresent()) {
                User user = existingUser.get();

                // Update fields
                user.setFullName(userDTO.getFullName());
                user.setPhone(userDTO.getPhone());
                user.setBio(userDTO.getBio());
                user.setProfileImage(userDTO.getProfileImage());
                user.setResumeUrl(userDTO.getResumeUrl());
                user.setUpdatedAt(LocalDateTime.now());

                User updatedUser = userRepository.save(user);
                log.info("User updated successfully: {}", updatedUser.getEmail());

                return Optional.of(entityDTOMapper.toUserDTO(updatedUser));
            } else {
                log.warn("User not found for update with ID: {}", userId);
                return Optional.empty();
            }
        } catch (Exception e) {
            log.error("Error updating user {}: {}", userId, e.getMessage(), e);
            throw new RuntimeException("Failed to update user", e);
        }
    }
}
