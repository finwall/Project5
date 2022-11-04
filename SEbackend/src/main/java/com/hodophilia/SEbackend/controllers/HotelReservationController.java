package com.hodophilia.SEbackend.controllers;


import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hodophilia.SEbackend.models.HotelReservation;
import com.hodophilia.SEbackend.payload.request.HotelReservationRequest;
import com.hodophilia.SEbackend.security.TokenProvider;
import com.hodophilia.SEbackend.security.services.hotels.Impl.HotelReservationService;
import com.nimbusds.jose.shaded.json.JSONObject;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@Produces(MediaType.APPLICATION_JSON)
@RequestMapping("/api/hotels/reservation")
public class HotelReservationController {
	
	private final HotelReservationService hotelReservationService;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	
	
//	@GetMapping("")
//    public ResponseEntity<List<HotelReservation>> getAllReservations() {
//        List<HotelReservation> reservations = hotelReservationService.fetchAllReservations();
//        return new ResponseEntity<>(reservations, HttpStatus.OK);
//    }
//
    @GetMapping("")
    public ResponseEntity<List<HotelReservation>> getReservationByUsername(@Param("email") String email) {
        List<HotelReservation> hotelReservations = hotelReservationService.findReservationsByEmail(email);
        
        JSONObject obj = new JSONObject();
        obj.put("hotelReservations", hotelReservations);
        return new ResponseEntity<>(hotelReservations, HttpStatus.OK);
    }
//    
//    @GetMapping("/all{id}")
//    public ResponseEntity<List<HotelReservation>> getAllReservationById(@PathVariable Long id) {
//        List<HotelReservation> reservation = hotelReservationService.findAllById(id);
//        return new ResponseEntity<>(reservation, HttpStatus.OK);
//    }
//
//    @PostMapping("")
//    public ResponseEntity<?>createReservation(@Valid @RequestBody HotelReservation reservation) {
//        reservationService.createReservation(reservation);
//        
//        JSONObject jsonObj = new JSONObject();
//        jsonObj.put("reservation", reservation);
//        return new ResponseEntity<>(reservation, HttpStatus.OK);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Map<String, Boolean>> updateReservation(@PathVariable Long id,
//                                                           @Valid @RequestBody HotelReservation reservation) {
//        reservation.setId(id);
//        hotelReservationService.updateReservation(reservation);
//        Map<String, Boolean> map = new HashMap<>();
//        map.put("success", true);
//        return new ResponseEntity<>(map, HttpStatus.CREATED);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Map<String, Boolean>> deleteReservation(@PathVariable Long id) {
//    	hotelReservationService.deleteReservation(id);
//        Map<String, Boolean> map = new HashMap<>();
//        map.put("success", true);
//        return new ResponseEntity<>(map, HttpStatus.OK);
//    }
    
    @PostMapping("/completeReservation")
	public ResponseEntity<?> completeReservation(@RequestHeader("Authorization") String token,@Valid @RequestBody HotelReservationRequest request) {
		if (request == null || request.getHotelId() == null || request.getRoomId()==null) {
			
			return new ResponseEntity<>("Invalid entry",HttpStatus.BAD_REQUEST);
		}
		
		if (tokenProvider.validateToken(token.substring(7, token.length()))) {
			String userEmail = tokenProvider.getUserEmailFromToken(token.substring(7, token.length()));

			
			HotelReservation hotelReservation = hotelReservationService.bookHotel(request,userEmail);
			
			if(hotelReservation == null)
			{
				return new ResponseEntity<>("Room not available, select another room",HttpStatus.BAD_REQUEST);
			}
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("hotelReservationDetails", hotelReservation);
		
			return new ResponseEntity<>(hotelReservation,HttpStatus.OK);
		}
		
		return new ResponseEntity<>("Invalid User",HttpStatus.UNAUTHORIZED);
		
	}
	
}
