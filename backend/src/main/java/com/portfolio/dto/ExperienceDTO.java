package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Data Transfer Object for Experience entity
 *
 * @author Debojit Chakraborty
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceDTO {

    private Long experienceId;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Position is required")
    private String position;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    private LocalDate endDate;
    private String description;
    private String technologies;
    private Boolean isCurrent;
    private LocalDateTime createdAt;

    // Custom constructor for essential fields
    public ExperienceDTO(String company, String position, LocalDate startDate) {
        this.company = company;
        this.position = position;
        this.startDate = startDate;
    }
}
