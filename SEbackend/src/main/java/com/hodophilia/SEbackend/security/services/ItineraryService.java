package com.hodophilia.SEbackend.security.services;

import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Itinerary;

import java.util.List;

public interface ItineraryService {
    List fetchItineraryList(Long UserId) throws ResourceNotFoundException;

    Itinerary fetchDetailsByItineraryId(Integer ItineraryId) throws ResourceNotFoundException;

    Itinerary addItinerary(Long UserId, String ItineraryName,
                           String FirstTravelDay, String StartDate, String ActionWithDate) throws BadRequestException;

}
