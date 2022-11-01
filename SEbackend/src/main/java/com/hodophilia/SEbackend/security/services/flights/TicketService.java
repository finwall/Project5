package com.hodophilia.SEbackend.security.services.flights;

import com.hodophilia.SEbackend.models.Ticket;
import com.hodophilia.SEbackend.payload.request.TicketRequest;

public interface TicketService {

	public Ticket bookFlight(TicketRequest request,String userEmail);
}