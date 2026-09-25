package com.nihal_portfolio.service;

import java.util.List;

import com.nihal_portfolio.entity.User;

public interface UserService {

	User save(User user);

	User getById(Long id);

	List<User> getAll();

}