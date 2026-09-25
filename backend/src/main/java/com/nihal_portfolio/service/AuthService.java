package com.nihal_portfolio.service;

import com.nihal_portfolio.request.LoginRequest;
import com.nihal_portfolio.request.RegisterRequest;
import com.nihal_portfolio.response.LoginResponse;

public interface AuthService {

	LoginResponse login(LoginRequest request);

	String register(RegisterRequest request);

}