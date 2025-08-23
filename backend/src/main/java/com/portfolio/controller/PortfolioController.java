package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactMessageDTO;
import com.portfolio.dto.EducationDTO;
import com.portfolio.dto.ExperienceDTO;
import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.dto.ProjectDTO;
import com.portfolio.dto.SkillDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.service.PortfolioService;
import com.portfolio.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Main Portfolio REST Controller
 * Handles all portfolio-related API endpoints
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@RestController
@RequestMapping("/portfolio")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@Tag(name = "Portfolio", description = "Portfolio management and data retrieval endpoints")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final UserService userService;

    /**
     * Health check endpoint
     */
    @Operation(
            summary = "Check portfolio service health",
            description = "Performs a comprehensive health check of the portfolio service including database connectivity and service availability"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Service is healthy and operating normally",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "503",
                    description = "Service is temporarily unavailable",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Internal server error during health check",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        log.info("Portfolio health check requested");

        try {
            boolean isHealthy = portfolioService.healthCheck();

            if (isHealthy) {
                log.debug("Portfolio service is healthy");
                return ResponseEntity.ok(
                        ApiResponse.success("Portfolio API is running smoothly", "Health check passed")
                );
            } else {
                log.warn("Portfolio service health check failed");
                return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body(ApiResponse.error("Service temporarily unavailable", "Health check failed"));
            }
        } catch (Exception e) {
            log.error("Health check endpoint failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Internal server error", "Health check endpoint failed"));
        }
    }

    /**
     * Get portfolio summary
     */
    @Operation(
            summary = "Get portfolio overview",
            description = "Retrieves a comprehensive summary of the portfolio including counts of experiences, projects, skills, and education records"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Portfolio summary retrieved successfully",
                    content = @Content(schema = @Schema(implementation = PortfolioSummaryDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "No portfolio data found",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve portfolio summary",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<PortfolioSummaryDTO>> getPortfolioSummary() {
        log.info("Portfolio summary requested");

        try {
            Optional<PortfolioSummaryDTO> summary = portfolioService.getPortfolioSummary();

            if (summary.isPresent()) {
                log.debug("Portfolio summary retrieved successfully");
                return ResponseEntity.ok(
                        ApiResponse.success(summary.get(), "Portfolio summary retrieved successfully")
                );
            } else {
                log.warn("No portfolio data found for summary");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("No portfolio data found", "Portfolio summary not available"));
            }
        } catch (Exception e) {
            log.error("Error retrieving portfolio summary: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve portfolio summary", e.getMessage()));
        }
    }

    /**
     * Get active user profile
     */
    @Operation(
            summary = "Get active user profile",
            description = "Retrieves the profile information of the currently active portfolio user"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Active user profile retrieved successfully",
                    content = @Content(schema = @Schema(implementation = UserDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "No active user found",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve user profile",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/user/active")
    public ResponseEntity<ApiResponse<UserDTO>> getActiveUser() {
        log.info("Active user profile requested");

        try {
            Optional<UserDTO> activeUser = userService.getActiveUser();

            if (activeUser.isPresent()) {
                log.debug("Active user profile retrieved: {}", activeUser.get().getEmail());
                return ResponseEntity.ok(
                        ApiResponse.success(activeUser.get(), "Active user profile retrieved successfully")
                );
            } else {
                log.warn("No active user found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("No active user found", "Please check system configuration"));
            }
        } catch (Exception e) {
            log.error("Error retrieving active user: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve user profile", e.getMessage()));
        }
    }

    /**
     * Get user experiences
     */
    @Operation(
            summary = "Get user professional experiences",
            description = "Retrieves all professional work experiences for a specific user, ordered by start date (most recent first)"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Experience data retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ExperienceDTO.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve experience data",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/experience/{userId}")
    public ResponseEntity<ApiResponse<List<ExperienceDTO>>> getUserExperience(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("Experience data requested for user: {}", userId);

        try {
            List<ExperienceDTO> experiences = portfolioService.getUserExperience(userId);

            log.debug("Retrieved {} experiences for user {}", experiences.size(), userId);
            return ResponseEntity.ok(
                    ApiResponse.success(experiences, "Experience data retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving experiences for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve experience data", e.getMessage()));
        }
    }

    /**
     * Get current user experiences
     */
    @Operation(
            summary = "Get current user experiences",
            description = "Retrieves only the current/ongoing professional experiences for a specific user"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Current experience data retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ExperienceDTO.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve current experience data",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/experience/{userId}/current")
    public ResponseEntity<ApiResponse<List<ExperienceDTO>>> getCurrentExperiences(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("Current experience data requested for user: {}", userId);

        try {
            List<ExperienceDTO> currentExperiences = portfolioService.getCurrentExperiences(userId);

            log.debug("Retrieved {} current experiences for user {}", currentExperiences.size(), userId);
            return ResponseEntity.ok(
                    ApiResponse.success(currentExperiences, "Current experience data retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving current experiences for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve current experience data", e.getMessage()));
        }
    }

    /**
     * Get user projects
     */
    @Operation(
            summary = "Get user projects",
            description = "Retrieves all projects created by a specific user, including project details, technologies used, and links to repositories or live demos"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project data retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ProjectDTO.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve project data",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/projects/{userId}")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getUserProjects(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("Project data requested for user: {}", userId);

        try {
            List<ProjectDTO> projects = portfolioService.getUserProjects(userId);

            log.debug("Retrieved {} projects for user {}", projects.size(), userId);
            return ResponseEntity.ok(
                    ApiResponse.success(projects, "Project data retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving projects for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve project data", e.getMessage()));
        }
    }

    /**
     * Get user skills
     */
    @Operation(
            summary = "Get user technical skills",
            description = "Retrieves all technical skills for a specific user, organized by categories such as programming languages, frameworks, databases, etc."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Skills data retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = SkillDTO.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve skills data",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/skills/{userId}")
    public ResponseEntity<ApiResponse<List<SkillDTO>>> getUserSkills(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("Skills data requested for user: {}", userId);

        try {
            List<SkillDTO> skills = portfolioService.getUserSkills(userId);

            log.debug("Retrieved {} skills for user {}", skills.size(), userId);
            return ResponseEntity.ok(
                    ApiResponse.success(skills, "Skills data retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving skills for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve skills data", e.getMessage()));
        }
    }

    /**
     * Get featured skills
     */
    @Operation(
            summary = "Get featured user skills",
            description = "Retrieves only the featured/highlighted technical skills for a specific user - typically the most important or proficient skills"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Featured skills data retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = SkillDTO.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve featured skills data",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/skills/{userId}/featured")
    public ResponseEntity<ApiResponse<List<SkillDTO>>> getFeaturedSkills(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("Featured skills data requested for user: {}", userId);

        try {
            List<SkillDTO> featuredSkills = portfolioService.getFeaturedSkills(userId);

            log.debug("Retrieved {} featured skills for user {}", featuredSkills.size(), userId);
            return ResponseEntity.ok(
                    ApiResponse.success(featuredSkills, "Featured skills data retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving featured skills for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve featured skills data", e.getMessage()));
        }
    }

    /**
     * Get skill categories
     */
    @Operation(
            summary = "Get skill categories",
            description = "Retrieves all distinct skill categories for a user (e.g., 'Programming Language', 'Framework', 'Database', 'Cloud', etc.)"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Skill categories retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = String.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve skill categories",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/skills/{userId}/categories")
    public ResponseEntity<ApiResponse<List<String>>> getSkillCategories(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("Skill categories requested for user: {}", userId);

        try {
            List<String> categories = portfolioService.getSkillCategories(userId);

            log.debug("Retrieved {} skill categories for user {}", categories.size(), userId);
            return ResponseEntity.ok(
                    ApiResponse.success(categories, "Skill categories retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving skill categories for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve skill categories", e.getMessage()));
        }
    }

    /**
     * Get user education
     */
    @Operation(
            summary = "Get user education background",
            description = "Retrieves all educational qualifications for a specific user, including degrees, institutions, GPAs, and academic achievements"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Education data retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = EducationDTO.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve education data",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/education/{userId}")
    public ResponseEntity<ApiResponse<List<EducationDTO>>> getUserEducation(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("Education data requested for user: {}", userId);

        try {
            List<EducationDTO> educations = portfolioService.getUserEducation(userId);

            log.debug("Retrieved {} education records for user {}", educations.size(), userId);
            return ResponseEntity.ok(
                    ApiResponse.success(educations, "Education data retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving education for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve education data", e.getMessage()));
        }
    }

    /**
     * Submit contact message
     */
    @Operation(
            summary = "Submit contact message",
            description = "Allows visitors to submit contact messages through the portfolio website. Messages are stored and can be retrieved by administrators."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Contact message submitted successfully",
                    content = @Content(schema = @Schema(implementation = ContactMessageDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Validation failed - required fields missing or invalid",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to submit contact message",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<ContactMessageDTO>> submitContactMessage(
            @Parameter(description = "Contact message details", required = true)
            @Valid @RequestBody ContactMessageDTO contactMessageDTO,
            BindingResult bindingResult) {

        log.info("Contact message submission from: {} ({})",
                contactMessageDTO.getName(), contactMessageDTO.getEmail());

        try {
            // Validation check
            if (bindingResult.hasErrors()) {
                String errorMessage = bindingResult.getFieldErrors().stream()
                        .map(error -> error.getField() + ": " + error.getDefaultMessage())
                        .collect(Collectors.joining(", "));

                log.warn("Contact message validation failed: {}", errorMessage);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Validation failed", errorMessage));
            }

            ContactMessageDTO savedMessage = portfolioService.submitContactMessage(contactMessageDTO);

            log.info("Contact message saved successfully with ID: {}", savedMessage.getMessageId());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(savedMessage, "Contact message submitted successfully"));

        } catch (Exception e) {
            log.error("Error submitting contact message from {}: {}",
                    contactMessageDTO.getEmail(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit contact message", e.getMessage()));
        }
    }

    /**
     * Get all contact messages (Admin endpoint)
     */
    @Operation(
            summary = "Get all contact messages (Admin only)",
            description = "Retrieves all contact messages submitted through the portfolio website. This is an administrative endpoint for managing inquiries."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Contact messages retrieved successfully",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ContactMessageDTO.class)))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "403",
                    description = "Access forbidden - Admin role required",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve contact messages",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/contact/messages")
    public ResponseEntity<ApiResponse<List<ContactMessageDTO>>> getAllContactMessages() {
        log.info("All contact messages requested (admin endpoint)");

        try {
            List<ContactMessageDTO> messages = portfolioService.getAllContactMessages();

            log.debug("Retrieved {} contact messages", messages.size());
            return ResponseEntity.ok(
                    ApiResponse.success(messages, "Contact messages retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving contact messages: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve contact messages", e.getMessage()));
        }
    }

    /**
     * Get unread messages count
     */
    @Operation(
            summary = "Get unread messages count",
            description = "Returns the number of unread contact messages. Useful for displaying notification badges in admin interfaces."
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Unread messages count retrieved successfully",
                    content = @Content(schema = @Schema(implementation = Long.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve unread messages count",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/contact/unread-count")
    public ResponseEntity<ApiResponse<Long>> getUnreadMessagesCount() {
        log.debug("Unread messages count requested");

        try {
            long unreadCount = portfolioService.getUnreadMessagesCount();

            log.debug("Unread messages count: {}", unreadCount);
            return ResponseEntity.ok(
                    ApiResponse.success(unreadCount, "Unread messages count retrieved successfully")
            );
        } catch (Exception e) {
            log.error("Error retrieving unread messages count: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve unread messages count", e.getMessage()));
        }
    }
}
