package com.nihal_portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.nihal_portfolio.request.LoginRequest;
import com.nihal_portfolio.request.RegisterRequest;
import com.nihal_portfolio.response.ApiResponse;
import com.nihal_portfolio.response.LoginResponse;
import com.nihal_portfolio.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(
            @Validated
            @RequestBody RegisterRequest request){

        String response=authService.register(request);

        return ResponseEntity.ok(

                ApiResponse.<String>builder()

                        .success(200)

                        .message(response)

                        .data(null)

                        .build()

        );

    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(

            @Validated

            @RequestBody LoginRequest request){

        LoginResponse response=authService.login(request);

        return ResponseEntity.ok(

                ApiResponse.<LoginResponse>builder()

                        .success(200)

                        .message("Login Successful")

                        .data(response)

                        .build()

        );

    }

}