package com.hodophilia.SEbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hodophilia.SEbackend.models.HotelReservation;

@Repository
@Transactional(readOnly = true)
public interface HotelReservationRepository extends JpaRepository<HotelReservation, Long> {

    List<HotelReservation> findAllById(Long id);
    
    List<HotelReservation> findByUserId(Long userId);
    
}
