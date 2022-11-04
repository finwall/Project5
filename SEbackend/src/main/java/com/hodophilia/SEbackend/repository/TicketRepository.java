package com.hodophilia.SEbackend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hodophilia.SEbackend.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {

//    Optional<Ticket> findById(Long id);
//
//    @Override
//    List<Ticket> findAll(Sort sort);
}
