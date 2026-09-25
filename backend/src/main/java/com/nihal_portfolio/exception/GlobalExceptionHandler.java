package com.nihal_portfolio.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> resourceNotFound(ResourceNotFoundException ex){

        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());

    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> badRequest(BadRequestException ex){

        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exception(Exception ex){

        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                ex.getMessage());

    }

    private ResponseEntity<?> buildResponse(
            HttpStatus status,
            String message){

        Map<String,Object> map=new LinkedHashMap<>();

        map.put("success",false);
        map.put("status",status.value());
        map.put("message",message);
        map.put("timestamp",LocalDateTime.now());

        return new ResponseEntity<>(map,status);

    }

}