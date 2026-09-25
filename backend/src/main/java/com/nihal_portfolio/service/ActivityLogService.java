package com.nihal_portfolio.service;

public interface ActivityLogService {
	// Call this one line from anywhere you want an event to show up on the
	// admin dashboard's activity graph, e.g.:
	//   activityLogService.log("PROJECT_CREATED", "Created project: " + project.getTitle());
	void log(String type, String description);
}
