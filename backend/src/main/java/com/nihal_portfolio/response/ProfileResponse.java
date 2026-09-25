package com.nihal_portfolio.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {

    private Long id;

    private String fullName;

    private String designation;

    private String about;

    private String email;

    private String phone;

    private String location;

    private Integer experienceYears;

    private String github;

    private String linkedin;

    private String portfolio;

    private String profileImage;

    private String resume;

}