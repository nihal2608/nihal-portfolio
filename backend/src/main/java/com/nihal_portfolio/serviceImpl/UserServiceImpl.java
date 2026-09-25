package com.nihal_portfolio.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nihal_portfolio.entity.User;
import com.nihal_portfolio.respository.UserRepository;
import com.nihal_portfolio.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository repository;

	@Override
	public User save(User user) {

		return repository.save(user);

	}

	@Override
	public User getById(Long id) {

		return repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

	}

	@Override
	public List<User> getAll() {

		return repository.findAll();

	}

}