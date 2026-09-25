package com.nihal_portfolio.service;

import com.nihal_portfolio.request.ProfileRequest;
import com.nihal_portfolio.response.ProfileResponse;

public interface ProfileService {

    ProfileResponse create(ProfileRequest request);

    ProfileResponse update(Long id, ProfileRequest request);

    ProfileResponse getProfile();

    void delete(Long id);

}