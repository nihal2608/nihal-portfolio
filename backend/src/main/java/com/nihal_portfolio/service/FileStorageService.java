package com.nihal_portfolio.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String uploadProfileImage(MultipartFile file);

    String uploadResume(MultipartFile file);
    
    String uploadProjectThumbnail(MultipartFile file);

    String uploadProjectImage(MultipartFile file);

}