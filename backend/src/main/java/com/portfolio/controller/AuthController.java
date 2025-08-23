package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.UserDTO;
import com.portfolio.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Authentication and User Management Controller
 * Handles user authentication, registration, and profile management
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@Tag(name = "Authentication", description = "User authentication, registration, and profile management endpoints")
public class AuthController {

    private final UserService userService;

    /**
     * User login (Placeholder for future JWT implementation)
     */
    @Operation(
            summary = "User login",
            description = """
            Authenticates a user with email and password credentials. Currently returns a placeholder JWT token.
            
            **Future Implementation:**
            - JWT token generation
            - User session management
            - Role-based authentication
            - Password validation
            """
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Login successful - Returns JWT token and user details",
                    content = @Content(
                            schema = @Schema(implementation = ApiResponse.class),
                            examples = @ExampleObject(
                                    name = "Successful Login",
                                    value = """
                    {
                        "data": {
                            "token": "jwt-token-placeholder",
                            "message": "Login successful",
                            "email": "user@example.com"
                        },
                        "message": "Login successful",
                        "error": null,
                        "success": true
                    }
                    """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "401",
                    description = "Invalid credentials - Wrong email or password",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Login failed due to server error",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(
            @Parameter(
                    description = "Login credentials with email and password",
                    required = true,
                    example = """
                {
                    "email": "devchakraborty9914@gmail.com",
                    "password": "your_password"
                }
                """
            )
            @RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        log.info("Login attempt for email: {}", email);

        try {
            // TODO: Implement actual authentication logic with JWT
            // For now, this is a placeholder response

            if (userService.emailExists(email)) {
                log.debug("Login successful for user: {}", email);

                Map<String, String> response = Map.of(
                        "token", "jwt-token-placeholder",
                        "message", "Login successful",
                        "email", email
                );

                return ResponseEntity.ok(
                        ApiResponse.success(response, "Login successful")
                );
            } else {
                log.warn("Login failed - user not found: {}", email);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ApiResponse.error("Invalid credentials", "User not found"));
            }
        } catch (Exception e) {
            log.error("Login error for {}: {}", email, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Login failed", e.getMessage()));
        }
    }

    /**
     * User registration
     */
    @Operation(
            summary = "Register new user",
            description = """
            Creates a new user account with the provided details. All users are created with default 'USER' role.
            
            **Required Fields:**
            - fullName: User's complete name
            - email: Valid email address (must be unique)
            
            **Optional Fields:**
            - phone: Contact phone number
            - bio: Personal biography/description
            """
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "User registered successfully",
                    content = @Content(
                            schema = @Schema(implementation = UserDTO.class),
                            examples = @ExampleObject(
                                    name = "Registration Success",
                                    value = """
                    {
                        "data": {
                            "userId": 1,
                            "fullName": "Debojit Chakraborty",
                            "email": "devchakraborty9914@gmail.com",
                            "phone": "+91-9706712621",
                            "bio": "Software Engineer passionate about backend development",
                            "isActive": true,
                            "createdAt": "2025-01-15T10:30:00"
                        },
                        "message": "User registered successfully",
                        "success": true
                    }
                    """
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Validation failed - Required fields missing or invalid format",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "409",
                    description = "Email already exists - User with this email is already registered",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Registration failed due to server error",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDTO>> register(
            @Parameter(
                    description = "User registration details",
                    required = true,
                    example = """
                {
                    "fullName": "Debojit Chakraborty",
                    "email": "devchakraborty9914@gmail.com",
                    "phone": "+91-9706712621",
                    "bio": "I am a computer programming enthusiast who loves designing and developing products."
                }
                """
            )
            @Valid @RequestBody UserDTO userDTO,
            BindingResult bindingResult) {

        log.info("Registration attempt for email: {}", userDTO.getEmail());

        try {
            // Validation check
            if (bindingResult.hasErrors()) {
                String errorMessage = bindingResult.getFieldErrors().stream()
                        .map(error -> error.getField() + ": " + error.getDefaultMessage())
                        .collect(Collectors.joining(", "));

                log.warn("Registration validation failed for {}: {}", userDTO.getEmail(), errorMessage);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Validation failed", errorMessage));
            }

            // Check if email already exists
            if (userService.emailExists(userDTO.getEmail())) {
                log.warn("Registration failed - email already exists: {}", userDTO.getEmail());
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(ApiResponse.error("Email already exists", "Please use a different email"));
            }

            UserDTO createdUser = userService.createUser(userDTO);

            log.info("User registered successfully: {} (ID: {})",
                    createdUser.getEmail(), createdUser.getUserId());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(createdUser, "User registered successfully"));

        } catch (IllegalArgumentException e) {
            log.warn("Registration failed for {}: {}", userDTO.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Registration failed", e.getMessage()));
        } catch (Exception e) {
            log.error("Registration error for {}: {}", userDTO.getEmail(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Registration failed", e.getMessage()));
        }
    }

    /**
     * Check if email exists
     */
    @Operation(
            summary = "Check email availability",
            description = """
            Checks whether an email address is already registered in the system. 
            Useful for real-time validation during user registration.
            
            **Use Cases:**
            - Registration form validation
            - Preventing duplicate registrations
            - User existence verification
            """
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Email check completed successfully",
                    content = @Content(
                            schema = @Schema(implementation = ApiResponse.class),
                            examples = {
                                    @ExampleObject(
                                            name = "Email exists",
                                            value = """
                        {
                            "data": {"exists": true},
                            "message": "Email check completed",
                            "success": true
                        }
                        """
                                    ),
                                    @ExampleObject(
                                            name = "Email available",
                                            value = """
                        {
                            "data": {"exists": false},
                            "message": "Email check completed", 
                            "success": true
                        }
                        """
                                    )
                            }
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Email check failed due to server error",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> checkEmail(
            @Parameter(
                    description = "Email address to check for availability",
                    required = true,
                    example = "devchakraborty9914@gmail.com"
            )
            @RequestParam String email) {

        log.debug("Email existence check for: {}", email);

        try {
            boolean exists = userService.emailExists(email);

            Map<String, Boolean> response = Map.of("exists", exists);

            log.debug("Email {} exists: {}", email, exists);
            return ResponseEntity.ok(
                    ApiResponse.success(response, "Email check completed")
            );
        } catch (Exception e) {
            log.error("Error checking email {}: {}", email, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Email check failed", e.getMessage()));
        }
    }

    /**
     * Get user profile by ID
     */
    @Operation(
            summary = "Get user profile by ID",
            description = """
            Retrieves detailed user profile information by user ID. 
            This endpoint requires authentication in production.
            
            **Returned Information:**
            - Basic profile details
            - Contact information
            - Account status
            - Creation/update timestamps
            """
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "User profile retrieved successfully",
                    content = @Content(schema = @Schema(implementation = UserDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "User not found with the specified ID",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve user profile",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/profile/{userId}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserProfile(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("User profile requested for ID: {}", userId);

        try {
            Optional<UserDTO> user = userService.getUserById(userId);

            if (user.isPresent()) {
                log.debug("User profile retrieved: {}", user.get().getEmail());
                return ResponseEntity.ok(
                        ApiResponse.success(user.get(), "User profile retrieved successfully")
                );
            } else {
                log.warn("User not found with ID: {}", userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("User not found", "No user found with the specified ID"));
            }
        } catch (Exception e) {
            log.error("Error retrieving user profile for ID {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve user profile", e.getMessage()));
        }
    }

    /**
     * Update user profile
     */
    @Operation(
            summary = "Update user profile",
            description = """
            Updates user profile information. Users can modify their personal details, 
            contact information, and bio. Email changes may require additional verification.
            
            **Updatable Fields:**
            - fullName: User's complete name
            - phone: Contact phone number  
            - bio: Personal biography/description
            - profileImage: Profile picture URL
            - resumeUrl: Resume/CV file URL
            
            **Note:** Email updates are restricted for security reasons.
            """
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "User profile updated successfully",
                    content = @Content(schema = @Schema(implementation = UserDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Validation failed - Invalid field values",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "User not found with the specified ID",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to update user profile",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @PutMapping("/profile/{userId}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUserProfile(
            @Parameter(description = "Unique identifier of the user to update", example = "1", required = true)
            @PathVariable Long userId,
            @Parameter(
                    description = "Updated user profile information",
                    required = true,
                    example = """
                {
                    "fullName": "Debojit Chakraborty",
                    "phone": "+91-9706712621",
                    "bio": "Senior Software Engineer with expertise in Java and Spring Boot",
                    "profileImage": "https://example.com/profile.jpg",
                    "resumeUrl": "https://example.com/resume.pdf"
                }
                """
            )
            @Valid @RequestBody UserDTO userDTO,
            BindingResult bindingResult) {

        log.info("Profile update requested for user ID: {}", userId);

        try {
            // Validation check
            if (bindingResult.hasErrors()) {
                String errorMessage = bindingResult.getFieldErrors().stream()
                        .map(error -> error.getField() + ": " + error.getDefaultMessage())
                        .collect(Collectors.joining(", "));

                log.warn("Profile update validation failed for user {}: {}", userId, errorMessage);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ApiResponse.error("Validation failed", errorMessage));
            }

            Optional<UserDTO> updatedUser = userService.updateUser(userId, userDTO);

            if (updatedUser.isPresent()) {
                log.info("User profile updated successfully for ID: {}", userId);
                return ResponseEntity.ok(
                        ApiResponse.success(updatedUser.get(), "User profile updated successfully")
                );
            } else {
                log.warn("User not found for update with ID: {}", userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("User not found", "No user found with the specified ID"));
            }
        } catch (Exception e) {
            log.error("Error updating user profile for ID {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to update user profile", e.getMessage()));
        }
    }

    /**
     * Get user with all details
     */
    @Operation(
            summary = "Get comprehensive user profile",
            description = """
            Retrieves complete user profile including all related data such as:
            - Professional experiences
            - Project portfolio  
            - Technical skills
            - Educational background
            
            This endpoint provides a complete view of the user's portfolio data in a single request.
            """
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Complete user profile retrieved successfully",
                    content = @Content(
                            schema = @Schema(implementation = UserDTO.class),
                            examples = @ExampleObject(
                                    name = "Complete User Profile",
                                    description = "User profile with all related portfolio data"
                            )
                    )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "User not found with the specified ID",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Failed to retrieve comprehensive user profile",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))
            )
    })
    @GetMapping("/profile/{userId}/details")
    public ResponseEntity<ApiResponse<UserDTO>> getUserWithDetails(
            @Parameter(description = "Unique identifier of the user", example = "1", required = true)
            @PathVariable Long userId) {

        log.info("User profile with details requested for ID: {}", userId);

        try {
            Optional<UserDTO> userWithDetails = userService.getUserWithAllDetails(userId);

            if (userWithDetails.isPresent()) {
                UserDTO user = userWithDetails.get();
                log.debug("User profile with details retrieved: {} - Experiences: {}, Projects: {}, Skills: {}, Education: {}",
                        user.getEmail(),
                        user.getExperiences() != null ? user.getExperiences().size() : 0,
                        user.getProjects() != null ? user.getProjects().size() : 0,
                        user.getSkills() != null ? user.getSkills().size() : 0,
                        user.getEducations() != null ? user.getEducations().size() : 0);

                return ResponseEntity.ok(
                        ApiResponse.success(user, "User profile with details retrieved successfully")
                );
            } else {
                log.warn("User not found with ID: {}", userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("User not found", "No user found with the specified ID"));
            }
        } catch (Exception e) {
            log.error("Error retrieving user with details for ID {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve user details", e.getMessage()));
        }
    }
}
