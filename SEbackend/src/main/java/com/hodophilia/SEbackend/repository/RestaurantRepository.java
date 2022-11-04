package com.hodophilia.SEbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hodophilia.SEbackend.models.Restaurant;


@Repository
@Transactional(readOnly = true)
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	
	@Query("from Restaurant where location = :location")
	List<Restaurant> findRestaurant(@Param("location") String location);
}
