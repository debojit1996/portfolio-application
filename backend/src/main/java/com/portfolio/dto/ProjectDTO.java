package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for Project entity
 *
 * @author Debojit Chakraborty
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {

    private Long projectId;

    @NotBlank(message = "Project name is required")
    private String projectName;

    private String description;
    private String technologies;
    private String githubUrl;
    private String liveUrl;
    private String imageUrl;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;

    // Custom constructor for essential fields
    public ProjectDTO(String projectName, String description) {
        this.projectName = projectName;
        this.description = description;
    }
}
