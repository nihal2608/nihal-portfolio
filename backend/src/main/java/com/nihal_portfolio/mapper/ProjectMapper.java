package com.nihal_portfolio.mapper;

import java.util.List;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.nihal_portfolio.entity.Project;
import com.nihal_portfolio.entity.ProjectImage;
import com.nihal_portfolio.entity.ProjectTechnology;
import com.nihal_portfolio.request.ProjectRequest;
import com.nihal_portfolio.response.ProjectResponse;

@Component
public class ProjectMapper {

    public Project toEntity(ProjectRequest request) {

        return Project.builder()
                .title(request.getTitle())
                .shortDescription(request.getShortDescription())
                .description(request.getDescription())
                .githubUrl(request.getGithubUrl())
                .liveUrl(request.getLiveUrl())
                .thumbnail(request.getThumbnail())
                .featured(request.getFeatured())
                .displayOrder(request.getDisplayOrder())
                .category(request.getCategory())
                .status(request.getStatus())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .active(true)
                .build();
    }

    public void updateEntity(Project project,
                             ProjectRequest request){

        project.setTitle(request.getTitle());
        project.setShortDescription(request.getShortDescription());
        project.setDescription(request.getDescription());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveUrl(request.getLiveUrl());
        project.setThumbnail(request.getThumbnail());
        project.setFeatured(request.getFeatured());
        project.setDisplayOrder(request.getDisplayOrder());
        project.setCategory(request.getCategory());
        project.setStatus(request.getStatus());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

    }

    public ProjectResponse toResponse(Project project){

        return ProjectResponse.builder()

                .id(project.getId())
                .title(project.getTitle())
                .shortDescription(project.getShortDescription())
                .description(project.getDescription())
                .githubUrl(project.getGithubUrl())
                .liveUrl(project.getLiveUrl())
                .thumbnail(project.getThumbnail())
                .featured(project.getFeatured())
                .displayOrder(project.getDisplayOrder())
                .category(project.getCategory())
                .status(project.getStatus())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())

                .images(
                        project.getImages()
                                .stream()
                                .map(ProjectImage::getImageUrl)
                                .collect(Collectors.toList())
                )

                .technologies(
                        project.getTechnologies()
                                .stream()
                                .map(ProjectTechnology::getTechnology)
                                .collect(Collectors.toList())
                )

                .build();

    }

}