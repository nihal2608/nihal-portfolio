package com.nihal_portfolio.request;

import java.time.LocalDate;
import java.util.List;

import com.nihal_portfolio.enums.ProjectStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProjectRequest {

    @NotBlank
    private String title;

    private String shortDescription;

    private String description;

    private String githubUrl;

    private String liveUrl;

    private String thumbnail;

    @NotNull
    private Boolean featured;

    @NotNull
    private Integer displayOrder;

    private String category;

    @NotNull
    private ProjectStatus status;

    private LocalDate startDate;

    private LocalDate endDate;

    private List<String> technologies;

    private List<String> images;

}