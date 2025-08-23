package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for Skill entity
 *
 * @author Debojit Chakraborty
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillDTO {

    private Long skillId;

    @NotBlank(message = "Skill name is required")
    private String skillName;

    private String skillCategory;
    private String proficiencyLevel;
    private Integer yearsExperience;
    private Boolean isFeatured;

    // Custom constructor for essential fields
    public SkillDTO(String skillName, String skillCategory, String proficiencyLevel) {
        this.skillName = skillName;
        this.skillCategory = skillCategory;
        this.proficiencyLevel = proficiencyLevel;
    }
}
