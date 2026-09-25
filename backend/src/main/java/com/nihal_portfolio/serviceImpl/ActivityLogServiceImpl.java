package com.nihal_portfolio.serviceImpl;

import com.nihal_portfolio.entity.ActivityLog;
import com.nihal_portfolio.respository.ActivityLogRepository;
import com.nihal_portfolio.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ActivityLogServiceImpl implements ActivityLogService {

	private final ActivityLogRepository repository;

	@Override
	public void log(String type, String description) {
		repository.save(
				ActivityLog.builder()
						.type(type)
						.description(description)
						.createdAt(LocalDateTime.now())
						.build()
		);
	}
}
