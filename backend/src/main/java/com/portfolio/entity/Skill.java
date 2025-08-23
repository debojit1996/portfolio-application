package com.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

/**
 * Skill entity representing technical skills
 *
 * @author Debojit Chakraborty
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "skills")
@EqualsAndHashCode(exclude = {"user"})
@ToString(exclude = {"user"})
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @NotBlank(message = "Skill name is required")
    private String skillName;

    private String skillCategory;
    private String proficiencyLevel;
    private Integer yearsExperience;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    private LocalDateTime createdAt;

    // Custom constructor for essential fields
    public Skill(String skillName, String skillCategory, String proficiencyLevel) {
        this.skillName = skillName;
        this.skillCategory = skillCategory;
        this.proficiencyLevel = proficiencyLevel;
        this.isFeatured = false;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
