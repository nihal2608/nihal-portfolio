package com.nihal_portfolio.serviceImpl;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.nihal_portfolio.entity.Profile;
import com.nihal_portfolio.exception.EmailAlreadyExistsException;
import com.nihal_portfolio.exception.ResourceNotFoundException;
import com.nihal_portfolio.mapper.ProfileMapper;
import com.nihal_portfolio.request.ProfileRequest;
import com.nihal_portfolio.response.ProfileResponse;
import com.nihal_portfolio.respository.ProfileRepository;
import com.nihal_portfolio.service.ProfileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfileServiceImpl implements ProfileService {

	private final ProfileRepository repository;
	private final ProfileMapper mapper;

	@Override
	public ProfileResponse create(ProfileRequest request) {

		if (repository.existsByEmail(request.getEmail())) {
			throw new EmailAlreadyExistsException("Email already exists.");
		}

		Profile profile = mapper.toEntity(request);

		return mapper.toResponse(repository.save(profile));
	}

	@Override
	public ProfileResponse update(Long id, ProfileRequest request) {

		Profile profile = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

		if (!profile.getEmail().equals(request.getEmail()) && repository.existsByEmail(request.getEmail())) {

			throw new EmailAlreadyExistsException("Email already exists.");
		}

		mapper.updateEntity(profile, request);

		return mapper.toResponse(repository.save(profile));
	}

	@Override
	@Transactional(readOnly = true)
	public ProfileResponse getProfile() {

		Profile profile = repository.findFirstByOrderByIdAsc()
				.orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

		return mapper.toResponse(profile);
	}

	@Override
	public void delete(Long id) {

		Profile profile = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Profile not found"));

		repository.delete(profile);
	}

}