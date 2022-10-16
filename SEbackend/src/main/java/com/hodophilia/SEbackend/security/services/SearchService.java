package com.hodophilia.SEbackend.security.services;

import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Search;

import java.util.List;

public interface SearchService {
    List<String> fetchAllPlaces();

    Search fetchDetailsByPlace(String Place) throws ResourceNotFoundException;

    Search addPlace(String PlaceId, String Place, String Description, String TravelAdvice,
                    String Hotels, String ThingsToDo, String Restaurants,
                    String TravelForum) throws BadRequestException;

}
