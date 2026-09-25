package com.nihal_portfolio.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.nihal_portfolio.common.BaseEntity;
import com.nihal_portfolio.enums.ProjectStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String githubUrl;

    private String liveUrl;

    private String thumbnail;

    @Builder.Default
    private Boolean featured = false;

    @Builder.Default
    private Boolean active = true;

    @Builder.Default
    private Integer displayOrder = 1;

    private String category;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    private LocalDate startDate;

    private LocalDate endDate;

    @OneToMany(mappedBy = "project",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @Builder.Default
    private List<ProjectImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "project",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @Builder.Default
    private List<ProjectTechnology> technologies = new ArrayList<>();

}