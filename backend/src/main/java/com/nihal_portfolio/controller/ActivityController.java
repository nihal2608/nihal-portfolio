package com.nihal_portfolio.controller;

import com.nihal_portfolio.entity.ActivityLog;
import com.nihal_portfolio.respository.ActivityLogRepository;
import com.nihal_portfolio.response.ActivityPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
public class ActivityController {

	private final ActivityLogRepository activityLogRepository;

	// GET /api/activity?range=day|week|month
	// day   -> last 24 hours, bucketed by hour  (24 points)
	// week  -> last 7 days,   bucketed by day   (7 points)
	// month -> last 30 days,  bucketed by day   (30 points)
	@GetMapping
	public List<ActivityPoint> getActivity(@RequestParam(defaultValue = "week") String range) {
		LocalDateTime now = LocalDateTime.now();

		return switch (range) {
			case "day" -> bucketByHour(now);
			case "month" -> bucketByDay(now, 30);
			default -> bucketByDay(now, 7);
		};
	}

	private List<ActivityPoint> bucketByHour(LocalDateTime now) {
		LocalDateTime from = now.minusHours(23).withMinute(0).withSecond(0).withNano(0);
		List<ActivityLog> logs = activityLogRepository.findByCreatedAtAfterOrderByCreatedAtAsc(from);

		Map<Integer, Long> counts = new LinkedHashMap<>();
		DateTimeFormatter labelFormat = DateTimeFormatter.ofPattern("HH:00");
		List<ActivityPoint> points = new ArrayList<>();

		for (int i = 0; i < 24; i++) {
			LocalDateTime bucketStart = from.plusHours(i);
			counts.put(i, 0L);
		}
		for (ActivityLog logEntry : logs) {
			long hoursFromStart = java.time.Duration.between(from, logEntry.getCreatedAt()).toHours();
			int bucket = (int) Math.max(0, Math.min(23, hoursFromStart));
			counts.merge(bucket, 1L, Long::sum);
		}
		for (int i = 0; i < 24; i++) {
			LocalDateTime bucketTime = from.plusHours(i);
			points.add(ActivityPoint.builder().label(bucketTime.format(labelFormat)).count(counts.get(i)).build());
		}
		return points;
	}

	private List<ActivityPoint> bucketByDay(LocalDateTime now, int days) {
		LocalDateTime from = now.minusDays(days - 1).withHour(0).withMinute(0).withSecond(0).withNano(0);
		List<ActivityLog> logs = activityLogRepository.findByCreatedAtAfterOrderByCreatedAtAsc(from);

		Map<Integer, Long> counts = new LinkedHashMap<>();
		DateTimeFormatter labelFormat = DateTimeFormatter.ofPattern("MMM d");
		List<ActivityPoint> points = new ArrayList<>();

		for (int i = 0; i < days; i++) counts.put(i, 0L);

		for (ActivityLog logEntry : logs) {
			long daysFromStart = java.time.Duration.between(from, logEntry.getCreatedAt()).toDays();
			int bucket = (int) Math.max(0, Math.min(days - 1, daysFromStart));
			counts.merge(bucket, 1L, Long::sum);
		}
		for (int i = 0; i < days; i++) {
			LocalDateTime bucketDay = from.plusDays(i);
			points.add(ActivityPoint.builder().label(bucketDay.format(labelFormat)).count(counts.get(i)).build());
		}
		return points;
	}
}
