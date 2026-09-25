package com.nihal_portfolio.serviceImpl;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nihal_portfolio.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {

	@Value("${file.upload-dir}")
	private String uploadDir;

	@Override
	public String uploadProfileImage(MultipartFile file) {

		return save(file, "profile");

	}

	@Override
	public String uploadResume(MultipartFile file) {

		return save(file, "resume");

	}

	private String save(MultipartFile file, String folder) {

		try {

			Path path = Paths.get(uploadDir, folder);

			if (!Files.exists(path)) {

				Files.createDirectories(path);

			}

			String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

			Path target = path.resolve(fileName);

			Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

			return target.toString();

		} catch (IOException e) {

			throw new RuntimeException("File Upload Failed");

		}

	}

	@Override
	public String uploadProjectThumbnail(MultipartFile file) {

		return save(file, "project-thumbnail");

	}

	@Override
	public String uploadProjectImage(MultipartFile file) {

		return save(file, "project-images");

	}

}