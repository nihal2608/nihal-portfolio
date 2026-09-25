package com.nihal_portfolio.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileRequest {

    @NotBlank(message = "Full Name is required")
    @Size(max = 100)
    private String fullName;

    @NotBlank(message = "Designation is required")
    private String designation;

    @NotBlank(message = "About is required")
    private String about;

    @Email(message = "Invalid Email")
    private String email;

    private String phone;

    private String location;

    private Integer experienceYears;

    private String github;

    private String linkedin;

    private String portfolio;

}