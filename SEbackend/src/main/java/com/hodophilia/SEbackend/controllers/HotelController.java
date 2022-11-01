package com.hodophilia.SEbackend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hodophilia.SEbackend.models.Hotel;
import com.hodophilia.SEbackend.repository.HotelRepository;
import com.hodophilia.SEbackend.security.services.hotels.HotelService;
import com.nimbusds.jose.shaded.json.JSONObject;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@AllArgsConstructor
@RestController
@Produces(MediaType.APPLICATION_JSON)
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;
    
    @Autowired
    private final HotelRepository hotelRepository;
    
    @GetMapping("findHotels")
	public ResponseEntity<?> findHotels(@RequestParam("location") String location
			) {
		

		
		List<Hotel> hotels = hotelRepository.findHotels(location);
		
		JSONObject jsonObj = new JSONObject();
        jsonObj.put("hotels", hotels);
		
		return new ResponseEntity<>(hotels,HttpStatus.OK);
		

	}

    @GetMapping("")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = hotelService.fetchAllHotels();
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        Hotel hotel = hotelService.findById(id);
        return new ResponseEntity<>(hotel, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Boolean>> createHotel(@Valid @RequestBody Hotel hotel) {
        hotelService.createHotel(hotel);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> updateHotel(@PathVariable Long id,
                                                            @Valid @RequestBody Hotel hotel) {
        hotel.setId(id);
        hotelService.updateHotel(hotel);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success", true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}