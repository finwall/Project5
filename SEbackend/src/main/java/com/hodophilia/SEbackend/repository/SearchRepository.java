package com.hodophilia.SEbackend.repository;

import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Search;

import java.util.List;


public interface SearchRepository{
    List<String> findAll() throws ResourceNotFoundException;

    Search findByPlace(String Place) throws ResourceNotFoundException;

    String create(String PlaceId, String Place, String Description, String TravelAdvice,
                  String Hotels, String ThingsToDo, String Restaurants,
                  String TravelForum) throws BadRequestException;

}
