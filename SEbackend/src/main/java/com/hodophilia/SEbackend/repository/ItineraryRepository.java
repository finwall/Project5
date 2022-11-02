package com.hodophilia.SEbackend.repository;

import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Itinerary;
import com.hodophilia.SEbackend.models.Search;

import java.util.Date;
import java.util.List;


public interface ItineraryRepository {
    List findItineraryList(Long UserId) throws ResourceNotFoundException;

    Itinerary findByItineraryId(Integer ItineraryId) throws ResourceNotFoundException;

    Integer createItinerary(Long UserId, String ItineraryName,
                           String FirstTravelDay, String StartDate, String ActionWithDate) throws BadRequestException;

}
