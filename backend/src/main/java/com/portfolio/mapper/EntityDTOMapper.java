package com.portfolio.mapper;

import com.portfolio.dto.ContactMessageDTO;
import com.portfolio.dto.EducationDTO;
import com.portfolio.dto.ExperienceDTO;
import com.portfolio.dto.ProjectDTO;
import com.portfolio.dto.SkillDTO;
import com.portfolio.dto.UserDTO;
import com.portfolio.entity.ContactMessage;
import com.portfolio.entity.Education;
import com.portfolio.entity.Experience;
import com.portfolio.entity.Project;
import com.portfolio.entity.Skill;
import com.portfolio.entity.User;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Entity to DTO Mapper Service
 * Handles conversion between entities and DTOs
 *
 * @author Debojit Chakraborty
 */
@Slf4j
@Component
public class EntityDTOMapper {

    // User mappings
    public UserDTO toUserDTO(User user) {
        if (user == null) {
            log.debug("User is null, returning null DTO");
            return null;
        }

        log.debug("Converting User entity to DTO: {}", user.getEmail());

        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setBio(user.getBio());
        dto.setProfileImage(user.getProfileImage());
        dto.setResumeUrl(user.getResumeUrl());
        dto.setIsActive(user.getIsActive());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        return dto;
    }

    public UserDTO toUserDTOWithDetails(User user) {
        if (user == null) {
            log.debug("User is null, returning null DTO");
            return null;
        }

        log.debug("Converting User entity to DTO with details: {}", user.getEmail());

        UserDTO dto = toUserDTO(user);

        // Map related entities
        if (user.getExperiences() != null) {
            dto.setExperiences(user.getExperiences().stream()
                    .map(this::toExperienceDTO)
                    .collect(Collectors.toList()));
        }

        if (user.getProjects() != null) {
            dto.setProjects(user.getProjects().stream()
                    .map(this::toProjectDTO)
                    .collect(Collectors.toList()));
        }

        if (user.getSkills() != null) {
            dto.setSkills(user.getSkills().stream()
                    .map(this::toSkillDTO)
                    .collect(Collectors.toList()));
        }

        if (user.getEducations() != null) {
            dto.setEducations(user.getEducations().stream()
                    .map(this::toEducationDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public User toUser(UserDTO dto) {
        if (dto == null) {
            log.debug("UserDTO is null, returning null entity");
            return null;
        }

        log.debug("Converting UserDTO to entity: {}", dto.getEmail());

        User user = new User();
        user.setUserId(dto.getUserId());
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setBio(dto.getBio());
        user.setProfileImage(dto.getProfileImage());
        user.setResumeUrl(dto.getResumeUrl());
        user.setIsActive(dto.getIsActive());
        user.setCreatedAt(dto.getCreatedAt());
        user.setUpdatedAt(dto.getUpdatedAt());

        return user;
    }

    // Experience mappings
    public ExperienceDTO toExperienceDTO(Experience experience) {
        if (experience == null) {
            return null;
        }

        ExperienceDTO dto = new ExperienceDTO();
        dto.setExperienceId(experience.getExperienceId());
        dto.setCompany(experience.getCompany());
        dto.setPosition(experience.getPosition());
        dto.setStartDate(experience.getStartDate());
        dto.setEndDate(experience.getEndDate());
        dto.setDescription(experience.getDescription());
        dto.setTechnologies(experience.getTechnologies());
        dto.setIsCurrent(experience.getIsCurrent());
        dto.setCreatedAt(experience.getCreatedAt());

        return dto;
    }

    public Experience toExperience(ExperienceDTO dto) {
        if (dto == null) {
            return null;
        }

        Experience experience = new Experience();
        experience.setExperienceId(dto.getExperienceId());
        experience.setCompany(dto.getCompany());
        experience.setPosition(dto.getPosition());
        experience.setStartDate(dto.getStartDate());
        experience.setEndDate(dto.getEndDate());
        experience.setDescription(dto.getDescription());
        experience.setTechnologies(dto.getTechnologies());
        experience.setIsCurrent(dto.getIsCurrent());
        experience.setCreatedAt(dto.getCreatedAt());

        return experience;
    }

    // Project mappings
    public ProjectDTO toProjectDTO(Project project) {
        if (project == null) {
            return null;
        }

        ProjectDTO dto = new ProjectDTO();
        dto.setProjectId(project.getProjectId());
        dto.setProjectName(project.getProjectName());
        dto.setDescription(project.getDescription());
        dto.setTechnologies(project.getTechnologies());
        dto.setGithubUrl(project.getGithubUrl());
        dto.setLiveUrl(project.getLiveUrl());
        dto.setImageUrl(project.getImageUrl());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setCreatedAt(project.getCreatedAt());

        return dto;
    }

    public Project toProject(ProjectDTO dto) {
        if (dto == null) {
            return null;
        }

        Project project = new Project();
        project.setProjectId(dto.getProjectId());
        project.setProjectName(dto.getProjectName());
        project.setDescription(dto.getDescription());
        project.setTechnologies(dto.getTechnologies());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveUrl(dto.getLiveUrl());
        project.setImageUrl(dto.getImageUrl());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setCreatedAt(dto.getCreatedAt());

        return project;
    }

    // Skill mappings
    public SkillDTO toSkillDTO(Skill skill) {
        if (skill == null) {
            return null;
        }

        SkillDTO dto = new SkillDTO();
        dto.setSkillId(skill.getSkillId());
        dto.setSkillName(skill.getSkillName());
        dto.setSkillCategory(skill.getSkillCategory());
        dto.setProficiencyLevel(skill.getProficiencyLevel());
        dto.setYearsExperience(skill.getYearsExperience());
        dto.setIsFeatured(skill.getIsFeatured());

        return dto;
    }

    public Skill toSkill(SkillDTO dto) {
        if (dto == null) {
            return null;
        }

        Skill skill = new Skill();
        skill.setSkillId(dto.getSkillId());
        skill.setSkillName(dto.getSkillName());
        skill.setSkillCategory(dto.getSkillCategory());
        skill.setProficiencyLevel(dto.getProficiencyLevel());
        skill.setYearsExperience(dto.getYearsExperience());
        skill.setIsFeatured(dto.getIsFeatured());

        return skill;
    }

    // Education mappings
    public EducationDTO toEducationDTO(Education education) {
        if (education == null) {
            return null;
        }

        EducationDTO dto = new EducationDTO();
        dto.setEducationId(education.getEducationId());
        dto.setInstitution(education.getInstitution());
        dto.setDegree(education.getDegree());
        dto.setFieldOfStudy(education.getFieldOfStudy());
        dto.setStartDate(education.getStartDate());
        dto.setEndDate(education.getEndDate());
        dto.setGpa(education.getGpa());
        dto.setDescription(education.getDescription());

        return dto;
    }

    public Education toEducation(EducationDTO dto) {
        if (dto == null) {
            return null;
        }

        Education education = new Education();
        education.setEducationId(dto.getEducationId());
        education.setInstitution(dto.getInstitution());
        education.setDegree(dto.getDegree());
        education.setFieldOfStudy(dto.getFieldOfStudy());
        education.setStartDate(dto.getStartDate());
        education.setEndDate(dto.getEndDate());
        education.setGpa(dto.getGpa());
        education.setDescription(dto.getDescription());

        return education;
    }

    // ContactMessage mappings
    public ContactMessageDTO toContactMessageDTO(ContactMessage contactMessage) {
        if (contactMessage == null) {
            return null;
        }

        ContactMessageDTO dto = new ContactMessageDTO();
        dto.setMessageId(contactMessage.getMessageId());
        dto.setName(contactMessage.getName());
        dto.setEmail(contactMessage.getEmail());
        dto.setSubject(contactMessage.getSubject());
        dto.setMessage(contactMessage.getMessage());
        dto.setSentDate(contactMessage.getSentDate());
        dto.setIsRead(contactMessage.getIsRead());
        dto.setResponse(contactMessage.getResponse());

        return dto;
    }

    public ContactMessage toContactMessage(ContactMessageDTO dto) {
        if (dto == null) {
            return null;
        }

        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setMessageId(dto.getMessageId());
        contactMessage.setName(dto.getName());
        contactMessage.setEmail(dto.getEmail());
        contactMessage.setSubject(dto.getSubject());
        contactMessage.setMessage(dto.getMessage());
        contactMessage.setSentDate(dto.getSentDate());
        contactMessage.setIsRead(dto.getIsRead());
        contactMessage.setResponse(dto.getResponse());

        return contactMessage;
    }

    // List conversion utilities
    public List<UserDTO> toUserDTOList(List<User> users) {
        return users.stream()
                .map(this::toUserDTO)
                .collect(Collectors.toList());
    }

    public List<ExperienceDTO> toExperienceDTOList(List<Experience> experiences) {
        return experiences.stream()
                .map(this::toExperienceDTO)
                .collect(Collectors.toList());
    }

    public List<ProjectDTO> toProjectDTOList(List<Project> projects) {
        return projects.stream()
                .map(this::toProjectDTO)
                .collect(Collectors.toList());
    }

    public List<SkillDTO> toSkillDTOList(List<Skill> skills) {
        return skills.stream()
                .map(this::toSkillDTO)
                .collect(Collectors.toList());
    }

    public List<EducationDTO> toEducationDTOList(List<Education> educations) {
        return educations.stream()
                .map(this::toEducationDTO)
                .collect(Collectors.toList());
    }

    public List<ContactMessageDTO> toContactMessageDTOList(List<ContactMessage> messages) {
        return messages.stream()
                .map(this::toContactMessageDTO)
                .collect(Collectors.toList());
    }
}
