package com.hodophilia.SEbackend.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(	name = "search",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "place")
        })

public class Search {
    @Id
    @SequenceGenerator(name = "searchSeqGen", sequenceName = "search_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "searchSeqGen")
    @Column(name = "searchId", updatable = false)
    private Integer searchId;

    @NotBlank
    @Size(max = 50)
    private String placeId;

    @NotBlank
    @Size(max = 150)
    private String place;

    @NotBlank
    @Size(max = 500)
    private String description;

    @NotBlank
    @Size(max = 1000)
    private String travelAdvice;

    @NotBlank
    @Size(max = 300)
    private String hotels;

    @NotBlank
    @Size(max = 3000)
    private String thingsToDo;

    @NotBlank
    @Size(max = 300)
    private String restaurants;

    @NotBlank
    @Size(max = 1000)
    private String travelForum;

    public Search(Integer searchId, String placeId, String place, String description,
                  String travelAdvice, String hotels, String thingsToDo,
                  String restaurants, String travelForum) {
        this.searchId = searchId;
        this.placeId = placeId;
        this.place = place;
        this.description = description;
        this.travelAdvice = travelAdvice;
        this.hotels = hotels;
        this.thingsToDo = thingsToDo;
        this.restaurants = restaurants;
        this.travelForum = travelForum;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public Integer getSearchId() {
        return searchId;
    }

    public void setSearchId(Integer searchId) {
        this.searchId = searchId;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTravelAdvice() {
        return travelAdvice;
    }

    public void setTravelAdvice(String travelAdvice) {
        this.travelAdvice = travelAdvice;
    }

    public String getHotels() {
        return hotels;
    }

    public void setHotels(String hotels) {
        this.hotels = hotels;
    }

    public String getThingsToDo() {
        return thingsToDo;
    }

    public void setThingsToDo(String thingsToDo) {
        this.thingsToDo = thingsToDo;
    }

    public String getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(String restaurants) {
        this.restaurants = restaurants;
    }

    public String getTravelForum() {
        return travelForum;
    }

    public void setTravelForum(String travelForum) {
        this.travelForum = travelForum;
    }
}
