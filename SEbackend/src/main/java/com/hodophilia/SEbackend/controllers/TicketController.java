package com.hodophilia.SEbackend.controllers;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hodophilia.SEbackend.models.Ticket;
import com.hodophilia.SEbackend.payload.request.TicketRequest;
import com.hodophilia.SEbackend.repository.FlightRepository;
import com.hodophilia.SEbackend.repository.TicketRepository;
import com.hodophilia.SEbackend.security.TokenProvider;
import com.hodophilia.SEbackend.security.services.flights.TicketService;
import com.nimbusds.jose.shaded.json.JSONObject;


@RestController
@RequestMapping("/api/ticket")
public class TicketController {

	@Autowired
	FlightRepository flightRepository;
	
	@Autowired
	TicketService ticketService; 
	
	@Autowired
	TicketRepository ticketRepository;
	
	@Autowired
	TokenProvider tokenProvider;

	@PostMapping("/completeReservation")
	public ResponseEntity<?> completeReservation(@RequestHeader("Authorization") String token,@Valid @RequestBody TicketRequest request) {
		if (request == null || request.getFlightId() == null) {
			
             return null;
	
		}
		
		if (tokenProvider.validateToken(token.substring(7, token.length()))) {
			String userEmail = tokenProvider.getUserEmailFromToken(token.substring(7, token.length()));
			Ticket ticket = ticketService.bookFlight(request,userEmail);
			JSONObject jsonObj = new JSONObject();
	        jsonObj.put("ticket", ticket);
			
			return new ResponseEntity<>(ticket,HttpStatus.OK);
		}
		
		return new ResponseEntity<>("Invalid User",HttpStatus.UNAUTHORIZED);
		
	}
	
	@RequestMapping("/reservations/{id}")
	public Ticket findReservation(@PathVariable Long id) {

		
		return ticketRepository.findById(id).get();

	}
	


}


