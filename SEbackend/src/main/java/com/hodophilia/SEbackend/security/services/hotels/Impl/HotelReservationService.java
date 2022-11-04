package com.hodophilia.SEbackend.security.services.hotels.Impl;

import java.util.List;

import com.hodophilia.SEbackend.models.HotelReservation;
import com.hodophilia.SEbackend.payload.request.HotelReservationRequest;

public interface HotelReservationService {
	public HotelReservation bookHotel(HotelReservationRequest request,String userEmail);
	
	public List<HotelReservation> findReservationsByEmail(String email);
}
