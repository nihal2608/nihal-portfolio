package com.nihal_portfolio.serviceImpl;

import com.nihal_portfolio.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

	// ObjectProvider instead of a plain JavaMailSender field: this always
	// injects successfully, even if Spring never created a JavaMailSender
	// bean (e.g. mail isn't configured yet). We check availability at
	// send-time instead of at startup, so the whole app doesn't fail to boot
	// just because email isn't set up.
	private final ObjectProvider<JavaMailSender> mailSenderProvider;

	@Value("${app.frontend-url:http://localhost:5173}")
	private String frontendUrl;

	@Value("${spring.mail.username:}")
	private String fromEmail;

	@Override
	public void sendInviteEmail(String toEmail, String role) {
		String encodedEmail = URLEncoder.encode(toEmail, StandardCharsets.UTF_8);
		String registerLink = frontendUrl + "/admin/register?email=" + encodedEmail;

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromEmail);
		message.setTo(toEmail);
		message.setSubject("You've been invited to the admin panel");
		message.setText(
				"Hi,\n\n"
				+ "You've been invited to join the admin panel as a " + role + ".\n\n"
				+ "Create your account here:\n" + registerLink + "\n\n"
				+ "Important: register using this exact email address (" + toEmail + "). "
				+ "Your role and permissions will be applied automatically as soon as you sign up.\n\n"
				+ "If you weren't expecting this, you can safely ignore this email."
		);

		sendSafely(message, toEmail);
	}

	@Override
	public void sendReplyEmail(String toEmail, String originalMessage, String replyText) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromEmail);
		message.setTo(toEmail);
		message.setSubject("Re: your message on the portfolio site");
		message.setText(
				replyText + "\n\n"
				+ "---------------------------------\n"
				+ "Your original message:\n"
				+ originalMessage
		);

		sendSafely(message, toEmail);
	}

	private void sendSafely(SimpleMailMessage message, String toEmail) {
		JavaMailSender mailSender = mailSenderProvider.getIfAvailable();

		if (mailSender == null) {
			log.warn("Email not sent to {} — no JavaMailSender is configured. "
					+ "Add spring.mail.* properties to application.properties to enable real emails.", toEmail);
			return;
		}

		try {
			mailSender.send(message);
		} catch (Exception e) {
			log.error("Failed to send email to {}: {}", toEmail, e.getMessage());
		}
	}
}
