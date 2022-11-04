package com.hodophilia.SEbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hodophilia.SEbackend.models.HotelRoom;

@Repository
@Transactional(readOnly = true)
public interface HotelRoomRepository extends JpaRepository<HotelRoom, Long> {
}	