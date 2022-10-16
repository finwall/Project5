package com.hodophilia.SEbackend.security.services;


import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Search;
import com.hodophilia.SEbackend.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SearchServiceImpl implements SearchService {

    @Autowired
    SearchRepository searchRepository;

    @Override
    public List<String> fetchAllPlaces() {
        return searchRepository.findAll();
    }

    @Override
    public Search fetchDetailsByPlace(String place) throws ResourceNotFoundException {
        return searchRepository.findByPlace(place);
    }

    @Override
    public Search addPlace(String placeId, String place, String description, String travelAdvice,
                           String hotels, String thingsToDo, String restaurants,
                           String travelForum) throws BadRequestException {
        String responsePlace = searchRepository.create(placeId, place, description, travelAdvice, hotels, thingsToDo, restaurants, travelForum);
        return searchRepository.findByPlace(responsePlace);
    }

}
