package com.hodophilia.SEbackend.security.services;


import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Itinerary;
import com.hodophilia.SEbackend.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ItineraryServiceImpl implements ItineraryService {

    @Autowired
    ItineraryRepository itineraryRepository;

    @Override
    public List fetchItineraryList(Long userId) throws ResourceNotFoundException {
        return itineraryRepository.findItineraryList(userId);
    }

    @Override
    public Itinerary fetchDetailsByItineraryId(Integer itineraryId) throws ResourceNotFoundException {
        return itineraryRepository.findByItineraryId(itineraryId);
    }

    @Override
    public Itinerary addItinerary(Long userId, String itineraryName,
                                  String firstTravelDay, String startDate, String actionWithDate) throws BadRequestException {
        Integer respItineraryId = itineraryRepository.createItinerary(userId, itineraryName, firstTravelDay, startDate, actionWithDate);
        return itineraryRepository.findByItineraryId(respItineraryId);
    }

}
