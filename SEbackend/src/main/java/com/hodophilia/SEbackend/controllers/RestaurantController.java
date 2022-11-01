package com.hodophilia.SEbackend.controllers;

import java.util.List;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hodophilia.SEbackend.models.Restaurant;
import com.hodophilia.SEbackend.repository.RestaurantRepository;
import com.nimbusds.jose.shaded.json.JSONObject;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
@RestController
@Produces(MediaType.APPLICATION_JSON)
@RequestMapping("/api/restaurants")
public class RestaurantController {
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@GetMapping("findHotels")
	public ResponseEntity<?> findHotels(@RequestParam("location") String location) {
		

		
		List<Restaurant> restaurants = restaurantRepository.findRestaurant(location);
		
		JSONObject jsonObj = new JSONObject();
        jsonObj.put("restaurants", restaurants);
		
		return new ResponseEntity<>(restaurants,HttpStatus.OK);
		

	}
}
