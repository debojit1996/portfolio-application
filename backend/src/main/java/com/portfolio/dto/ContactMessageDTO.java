package com.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for ContactMessage entity
 *
 * @author Debojit Chakraborty
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageDTO {

    private Long messageId;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String subject;

    @NotBlank(message = "Message is required")
    private String message;

    private LocalDateTime sentDate;
    private Boolean isRead;
    private String response;

    // Custom constructor for essential fields
    public ContactMessageDTO(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
}
