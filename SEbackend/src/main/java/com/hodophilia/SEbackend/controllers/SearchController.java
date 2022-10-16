package com.hodophilia.SEbackend.controllers;

import com.hodophilia.SEbackend.models.Search;
import com.hodophilia.SEbackend.security.services.SearchService;
import com.nimbusds.jose.shaded.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    SearchService searchService;

    @CrossOrigin(origins = "*", allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept"})
    @GetMapping("")
    public ResponseEntity<?> getAllPlaces(HttpServletRequest request) {
        List<String> placesList = searchService.fetchAllPlaces();
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("places", placesList);
        return new ResponseEntity<>(jsonObj, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*", allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept"})
    @GetMapping("/{place}")
    public ResponseEntity<Search> getCategoryById(HttpServletRequest request,
                                                    @PathVariable("place") String place) {
        Search search = searchService.fetchDetailsByPlace(place);
        return new ResponseEntity<>(search, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Search> addPlace(HttpServletRequest request,
                                              @RequestBody Map<String, Object> searchMap) {
        String placeId = (String) searchMap.get("PlaceId");
        String place = (String) searchMap.get("Place");
        String description = (String) searchMap.get("Description");
        String travelAdvice = (String) searchMap.get("TravelAdvice");
        String hotels = (String) searchMap.get("Hotels");
        String thingsToDo = (String) searchMap.get("ThingsToDo");
        String restaurants = (String) searchMap.get("Restaurants");
        String travelForum = (String) searchMap.get("TravelForum");
        Search search = searchService.addPlace(placeId, place, description, travelAdvice, hotels, thingsToDo, restaurants, travelForum);
        return new ResponseEntity<>(search, HttpStatus.CREATED);
    }

}
