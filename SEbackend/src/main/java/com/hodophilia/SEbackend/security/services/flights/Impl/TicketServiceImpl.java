package com.hodophilia.SEbackend.security.services.flights.Impl;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hodophilia.SEbackend.models.Flight;
import com.hodophilia.SEbackend.models.Passenger;
import com.hodophilia.SEbackend.models.Ticket;
import com.hodophilia.SEbackend.payload.request.TicketRequest;
import com.hodophilia.SEbackend.repository.FlightRepository;
import com.hodophilia.SEbackend.repository.PassengerRepository;
import com.hodophilia.SEbackend.repository.TicketRepository;
import com.hodophilia.SEbackend.repository.UserRepository;
import com.hodophilia.SEbackend.security.services.CustomUserDetailsService;
import com.hodophilia.SEbackend.security.services.flights.TicketService;


@Service
public class TicketServiceImpl implements TicketService {

	
	@Autowired
	FlightRepository flightRepository;
	@Autowired
	PassengerRepository passengerRepository;
	@Autowired
	TicketRepository ticketRepository;
	
	@Autowired
	CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private UserRepository userRepository;
	
	

	@Override
	@Transactional
	public Ticket bookFlight(TicketRequest request,String userEmail) {

		
		Long flightId = request.getFlightId();
		Optional<Flight> flight = flightRepository.findById(flightId);
		
		Passenger passenger = new Passenger();
		passenger.setFirstName(request.getPassengerFirstName());
		passenger.setLastName(request.getPassengerLastName());
		passenger.setEmail(request.getPassengerEmail());
		passenger.setPhone(request.getPassengerPhone());
		Passenger savedPassenger = passengerRepository.save(passenger);
		

		
		Ticket ticket = new Ticket();
		ticket.setFlight(flight.get());
		ticket.setPassenger(savedPassenger);
		ticket.setCheckedIn(false);
		ticket.setUser(userRepository.findByEmail(userEmail).get());
		Ticket savedTicket = ticketRepository.save(ticket);
		

		return savedTicket;
	}

}