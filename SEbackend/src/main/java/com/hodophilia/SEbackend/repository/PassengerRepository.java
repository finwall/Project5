package com.hodophilia.SEbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hodophilia.SEbackend.models.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {

}
