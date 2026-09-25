package com.nihal_portfolio.controller;

import com.nihal_portfolio.entity.Message;
import com.nihal_portfolio.request.CreateMessageRequest;
import com.nihal_portfolio.request.ReplyMessageRequest;
import com.nihal_portfolio.response.MessageResponse;
import com.nihal_portfolio.respository.MessageRepository;
import com.nihal_portfolio.service.ActivityLogService;
import com.nihal_portfolio.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

// SecurityConfig note: add POST /api/messages to the permitAll() block
// (the public contact form calls it with no token). GET/PUT/DELETE on
// /api/messages/** should stay authenticated (admin only) — that's already
// the default under anyRequest().authenticated().
@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

	private final MessageRepository messageRepository;
	private final EmailService emailService;
	private final ActivityLogService activityLogService;

	@PostMapping
	public MessageResponse create(@RequestBody CreateMessageRequest request) {
		Message message = Message.builder()
				.name(request.getName())
				.email(request.getEmail())
				.message(request.getMessage())
				.read(false)
				.replied(false)
				.createdAt(LocalDateTime.now())
				.build();

		messageRepository.save(message);
		activityLogService.log("MESSAGE_RECEIVED", "New message from " + request.getName());

		return toResponse(message);
	}

	@GetMapping
	public List<MessageResponse> getAll() {
		return messageRepository.findAll().stream()
				.sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
				.map(this::toResponse)
				.toList();
	}

	@GetMapping("/unread-count")
	public long unreadCount() {
		return messageRepository.countByReadFalse();
	}

	@PutMapping("/{id}/read")
	public MessageResponse markRead(@PathVariable Long id) {
		Message message = messageRepository.findById(id).orElseThrow();
		message.setRead(true);
		messageRepository.save(message);
		return toResponse(message);
	}

	@PostMapping("/{id}/reply")
	public MessageResponse reply(@PathVariable Long id, @RequestBody ReplyMessageRequest request) {
		Message message = messageRepository.findById(id).orElseThrow();

		emailService.sendReplyEmail(message.getEmail(), message.getMessage(), request.getReplyText());

		message.setReplied(true);
		message.setReplyText(request.getReplyText());
		message.setRepliedAt(LocalDateTime.now());
		message.setRead(true);
		messageRepository.save(message);

		return toResponse(message);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		messageRepository.deleteById(id);
	}

	private MessageResponse toResponse(Message m) {
		return MessageResponse.builder()
				.id(m.getId())
				.name(m.getName())
				.email(m.getEmail())
				.message(m.getMessage())
				.read(m.isRead())
				.replied(m.isReplied())
				.replyText(m.getReplyText())
				.repliedAt(m.getRepliedAt())
				.createdAt(m.getCreatedAt())
				.build();
	}
}
