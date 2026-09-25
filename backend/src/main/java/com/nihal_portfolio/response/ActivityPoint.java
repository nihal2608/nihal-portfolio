package com.nihal_portfolio.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityPoint {
	private String label; // e.g. "14:00" (day view), "Mon" (week view), "Jul 20" (month view)
	private long count;
}
