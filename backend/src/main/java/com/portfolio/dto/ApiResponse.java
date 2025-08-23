package com.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic API Response wrapper
 *
 * @author Debojit Chakraborty
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    private T data;
    private String message;
    private String error;
    private boolean success;

    // Static factory methods for success responses
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, "Success", null, true);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(data, message, null, true);
    }

    // Static factory methods for error responses
    public static <T> ApiResponse<T> error(String error) {
        return new ApiResponse<>(null, null, error, false);
    }

    public static <T> ApiResponse<T> error(String error, String message) {
        return new ApiResponse<>(null, message, error, false);
    }
}
