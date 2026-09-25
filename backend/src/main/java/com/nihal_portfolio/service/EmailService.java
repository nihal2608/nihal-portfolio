package com.nihal_portfolio.service;

public interface EmailService {
	void sendInviteEmail(String toEmail, String role);

	// New: used when an admin replies to a contact-form message.
	void sendReplyEmail(String toEmail, String originalMessage, String replyText);
}
