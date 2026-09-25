package com.nihal_portfolio.response;

import java.time.LocalDate;
import java.util.List;

import com.nihal_portfolio.enums.ProjectStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProjectResponse {

    private Long id;

    private String title;

    private String shortDescription;

    private String description;

    private String githubUrl;

    private String liveUrl;

    private String thumbnail;

    private Boolean featured;

    private Integer displayOrder;

    private String category;

    private ProjectStatus status;

    private LocalDate startDate;

    private LocalDate endDate;

    private List<String> technologies;

    private List<String> images;

}