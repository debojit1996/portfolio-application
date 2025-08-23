package com.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for Portfolio Summary
 *
 * @author Debojit Chakraborty
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioSummaryDTO {

    private String name;
    private String email;
    private String bio;
    private String profileImage;
    private Integer experienceCount;
    private Integer projectCount;
    private Integer skillCount;
    private Integer educationCount;
}
