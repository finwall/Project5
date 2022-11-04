package com.hodophilia.SEbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hodophilia.SEbackend.models.Hotel;

@Repository
@Transactional(readOnly = true)
public interface HotelRepository extends JpaRepository<Hotel, Long> {
	
	@Query("from Hotel where location = :location")
	List<Hotel> findHotels(@Param("location") String location);
}
	