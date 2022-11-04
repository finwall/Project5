package com.hodophilia.SEbackend.controllers;

import com.hodophilia.SEbackend.exceptions.OAuth2AuthenticationProcessingException;
import com.hodophilia.SEbackend.models.Itinerary;
import com.hodophilia.SEbackend.models.Search;
import com.hodophilia.SEbackend.models.User;
import com.hodophilia.SEbackend.repository.UserRepository;
import com.hodophilia.SEbackend.security.TokenAuthenticationFilter;
import com.hodophilia.SEbackend.security.TokenProvider;
import com.hodophilia.SEbackend.security.services.ItineraryService;
import com.hodophilia.SEbackend.security.services.SearchService;
import com.nimbusds.jose.shaded.json.JSONObject;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;

import javax.annotation.security.RolesAllowed;
import javax.management.relation.Role;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

//@Api(tags = "UserItinerary")
@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {

    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    ItineraryService itineraryService;

    @CrossOrigin(origins = "*", allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept"})
    @GetMapping("")
    public ResponseEntity<?> getItineraryList(HttpServletRequest request) {
        String jwt = TokenAuthenticationFilter.getJwtFromRequest(request);
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);
            List itineraryList = itineraryService.fetchItineraryList(Long.valueOf(userId));
            return new ResponseEntity<>(itineraryList, HttpStatus.OK);
        }
        else {
            throw new OAuth2AuthenticationProcessingException("USER NOT AUTHORIZED TO USE THIS RESOURCE");
        }

    }

    @CrossOrigin(origins = "*", allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept"})
    @GetMapping("/{itineraryId}")
    public ResponseEntity<Itinerary> getItineraryById(HttpServletRequest request,
                                                    @PathVariable("itineraryId") Integer itineraryId) {
        String jwt = TokenAuthenticationFilter.getJwtFromRequest(request);
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Itinerary itinerary = itineraryService.fetchDetailsByItineraryId(itineraryId);
            return new ResponseEntity<>(itinerary, HttpStatus.OK);
        }
        else {
            throw new OAuth2AuthenticationProcessingException("USER NOT AUTHORIZED TO USE THIS RESOURCE");
        }

    }

    @CrossOrigin(origins = "*", allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept"})
    @PostMapping("")
    public ResponseEntity<Itinerary> addItinerary(HttpServletRequest request,
                                                  @RequestBody Map<String, Object> itineraryMap) {

        String jwt = TokenAuthenticationFilter.getJwtFromRequest(request);
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userId1 = tokenProvider.getUserIdFromToken(jwt);
            String itineraryName = (String) itineraryMap.get("itineraryName");
            String firstTravelDay = (String) itineraryMap.get("firstTravelDay");
            String startDate = (String) itineraryMap.get("startDate");
            String actionWithDate = (String) itineraryMap.get("actionWithDate");
            Itinerary itinerary = itineraryService.addItinerary(userId1, itineraryName, firstTravelDay, startDate, actionWithDate);
            return new ResponseEntity<>(itinerary, HttpStatus.CREATED);
        }
        else {
            throw new OAuth2AuthenticationProcessingException("USER NOT AUTHORIZED TO USE THIS RESOURCE");
        }
    }

}
