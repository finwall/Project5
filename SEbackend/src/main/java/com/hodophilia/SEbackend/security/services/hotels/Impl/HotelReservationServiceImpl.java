package com.hodophilia.SEbackend.security.services.hotels.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hodophilia.SEbackend.models.Hotel;
import com.hodophilia.SEbackend.models.HotelReservation;
import com.hodophilia.SEbackend.models.HotelRoom;
import com.hodophilia.SEbackend.payload.request.HotelReservationRequest;
import com.hodophilia.SEbackend.repository.HotelRepository;
import com.hodophilia.SEbackend.repository.HotelReservationRepository;
import com.hodophilia.SEbackend.repository.HotelRoomRepository;
import com.hodophilia.SEbackend.repository.UserRepository;

@Service
public class HotelReservationServiceImpl implements HotelReservationService{
	
	@Autowired
	HotelRepository hotelRepository;

	@Autowired
	HotelRoomRepository hotelRoomRepository;
	
	@Autowired
	HotelReservationRepository hotelReservationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<HotelReservation> findReservationsByEmail(String email) 
	{
		Long userId = userRepository.findByEmail(email).get().getId();
		
		List<HotelReservation> hotelReservations = hotelReservationRepository.findByUserId(userId);
		
		return hotelReservations;
	}
	
	
	@Override
	@Transactional
	public HotelReservation bookHotel(HotelReservationRequest request,String userEmail) {
		
		Long hotelId = request.getHotelId();
		
		Optional<Hotel> hotel = hotelRepository.findById(hotelId);
		
		Long roomId = request.getRoomId();
		
		Optional<HotelRoom> hotelRoom = hotelRoomRepository.findById(roomId);
		
		if(hotelRoom.get().getIsAvailable()) { 
		
		HotelReservation hotelReservation = new HotelReservation();
		
		hotelReservation.setContactEmail(request.getContactEmail());
		
		hotelReservation.setContactPhone(request.getContactPhone());
		
		hotelReservation.setStartDate(request.getCheckInDate());
		
		hotelReservation.setEndDate(request.getCheckOutDate());
		
		hotelReservation.setNumOfAdult(request.getNumOfAdult());
		
		hotelReservation.setNumOfChildren(request.getNumOfChildren());
		
		hotelReservation.setHotel(hotel.get());
		
		hotelReservation.setRoom(hotelRoom.get());
		
		hotelReservation.setPrice(hotelRoom.get().getPrice());
		
		hotelReservation.setUser(userRepository.findByEmail(userEmail).get());
		
		hotelReservationRepository.save(hotelReservation);
		
		hotelRoom.get().setIsAvailable(false);
		
		return hotelReservation;
		
		}
		
		return null;
		
	}
}
