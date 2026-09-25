package com.nihal_portfolio.mapper;

import org.springframework.stereotype.Component;

import com.nihal_portfolio.entity.Profile;
import com.nihal_portfolio.request.ProfileRequest;
import com.nihal_portfolio.response.ProfileResponse;

@Component
public class ProfileMapper {

    public Profile toEntity(ProfileRequest request) {

        if (request == null) {
            return null;
        }

        return Profile.builder()
                .fullName(request.getFullName())
                .designation(request.getDesignation())
                .about(request.getAbout())
                .email(request.getEmail())
                .phone(request.getPhone())
                .location(request.getLocation())
                .experienceYears(request.getExperienceYears())
                .github(request.getGithub())
                .linkedin(request.getLinkedin())
                .portfolio(request.getPortfolio())
                .build();

    }

    public void updateEntity(Profile profile, ProfileRequest request) {

        profile.setFullName(request.getFullName());
        profile.setDesignation(request.getDesignation());
        profile.setAbout(request.getAbout());
        profile.setEmail(request.getEmail());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setExperienceYears(request.getExperienceYears());
        profile.setGithub(request.getGithub());
        profile.setLinkedin(request.getLinkedin());
        profile.setPortfolio(request.getPortfolio());

    }

    public ProfileResponse toResponse(Profile profile) {

        if (profile == null) {
            return null;
        }

        return ProfileResponse.builder()
                .id(profile.getId())
                .fullName(profile.getFullName())
                .designation(profile.getDesignation())
                .about(profile.getAbout())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .location(profile.getLocation())
                .experienceYears(profile.getExperienceYears())
                .github(profile.getGithub())
                .linkedin(profile.getLinkedin())
                .portfolio(profile.getPortfolio())
                .profileImage(profile.getProfileImage())
                .resume(profile.getResume())
                .build();

    }

}