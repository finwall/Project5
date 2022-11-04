package com.hodophilia.SEbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hodophilia.SEbackend.models.Flight;
import com.hodophilia.SEbackend.repository.FlightRepository;
import com.nimbusds.jose.shaded.json.JSONObject;



@RestController
@RequestMapping("/api/flights/")
public class FlightController {

	@Autowired
	FlightRepository flightRepository;
	


	@GetMapping("findFlights")
	public ResponseEntity<?> findFlight(@RequestParam("from") String from, @RequestParam("to") String to,
			@RequestParam("departureDate") String departureDate) {
		

		
		List<Flight> flights = flightRepository.findFlights(from, to, departureDate);
		
		JSONObject jsonObj = new JSONObject();
        jsonObj.put("flights", flights);
		
		return new ResponseEntity<>(flights,HttpStatus.OK);
		

	}
	
	
	
}