package com.hodophilia.SEbackend.repository;

import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Itinerary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ItineraryRepositoryImpl implements ItineraryRepository {

    private static final String SQL_FIND_ITINERARY_LIST = "SELECT USER_ID, ITINERARY_ID, ITINERARY_NAME, " +
            "FIRST_TRAVEL_DAY, START_DATE, ACTION_WITH_DATE " +
            "FROM ITINERARY " +
            "WHERE USER_ID = ?";

    private static final String SQL_FIND_BY_ITINERARY_ID = "SELECT USER_ID, ITINERARY_ID, ITINERARY_NAME, " +
            "FIRST_TRAVEL_DAY, START_DATE, ACTION_WITH_DATE " +
            "FROM ITINERARY " +
            "WHERE ITINERARY_ID = ?";

    private static final String SQL_CREATE_ITINERARY = "INSERT INTO ITINERARY (ITINERARY_ID, USER_ID, ITINERARY_NAME, " +
            "FIRST_TRAVEL_DAY, START_DATE, ACTION_WITH_DATE) " +
            "VALUES(nextval('itinerary_seq'), ?, ?, ?, ?, ?)";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Itinerary> findItineraryList(Long UserId) throws ResourceNotFoundException {

        try {
            return jdbcTemplate.query(SQL_FIND_ITINERARY_LIST, itineraryRowMapper, new Object[]{UserId});
        }catch (Exception e) {
            throw new ResourceNotFoundException("Itinerary not found");
        }
    }

    @Override
    public Itinerary findByItineraryId(Integer ItineraryId) throws ResourceNotFoundException {
        try {
            return jdbcTemplate.queryForObject(SQL_FIND_BY_ITINERARY_ID, itineraryRowMapper, new Object[]{ItineraryId});
        }catch (Exception e) {
            throw new ResourceNotFoundException("Itinerary not found");
        }
    }

    @Override
    public Integer createItinerary(Long userId, String itineraryName,
                                  String firstTravelDay, String startDate, String actionWithDate) throws BadRequestException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE_ITINERARY, Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, userId);
                ps.setString(2, itineraryName);
                ps.setString(3, firstTravelDay);
                ps.setString(4, startDate);
                ps.setString(5, actionWithDate);
                return ps;
            }, keyHolder);
            return (Integer) keyHolder.getKeys().get("ITINERARY_ID");
        }catch (Exception e) {
            throw new BadRequestException("Invalid request");
        }
    }

    private RowMapper<Itinerary> itineraryRowMapper = ((rs, rowNum) -> {
        return new Itinerary(rs.getInt("ITINERARY_ID"),
                rs.getLong("USER_ID"),
                rs.getString("ITINERARY_NAME"),
                rs.getString("FIRST_TRAVEL_DAY"),
                rs.getString("START_DATE"),
                rs.getString("ACTION_WITH_DATE"));
    });

}
