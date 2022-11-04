package com.hodophilia.SEbackend.repository;

import com.hodophilia.SEbackend.exceptions.BadRequestException;
import com.hodophilia.SEbackend.exceptions.ResourceNotFoundException;
import com.hodophilia.SEbackend.models.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class SearchRepositoryImpl implements SearchRepository {

    private static final String SQL_FIND_ALL = "SELECT PLACE FROM SEARCH ";

    private static final String SQL_FIND_BY_PLACE = "SELECT SEARCH_ID, PLACE_ID, PLACE, DESCRIPTION, " +
            "TRAVEL_ADVICE, HOTELS, THINGS_TO_DO, RESTAURANTS, TRAVEL_FORUM " +
            "FROM SEARCH " +
            "WHERE PLACE = ? ";

    private static final String SQL_CREATE = "INSERT INTO SEARCH (SEARCH_ID, PLACE_ID, PLACE, DESCRIPTION, " +
            "TRAVEL_ADVICE, HOTELS, THINGS_TO_DO, RESTAURANTS, TRAVEL_FORUM) " +
            "VALUES(nextval('search_seq'), ?, ?, ?, ?, ?, ?, ?, ?)";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public ArrayList<String> findAll() throws ResourceNotFoundException {
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(SQL_FIND_ALL);
        ArrayList<String> pList = new ArrayList<String>();
        for(Map<String, Object> row : rows){
            String place = (String)row.get("place");
            pList.add(place);
        }
        return pList;
    }

    @Override
    public Search findByPlace(String Place) throws ResourceNotFoundException {
        try {
            return jdbcTemplate.queryForObject(SQL_FIND_BY_PLACE, searchRowMapper, new Object[]{Place});
        }catch (Exception e) {
            throw new ResourceNotFoundException("Search not found");
        }
    }

    @Override
    public String create(String placeId, String place, String description, String travelAdvice,
                         String hotels, String thingsToDo, String restaurants,
                         String travelForum) throws BadRequestException {
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, placeId);
                ps.setString(2, place);
                ps.setString(3, description);
                ps.setString(4, travelAdvice);
                ps.setString(5, hotels);
                ps.setString(6, thingsToDo);
                ps.setString(7, restaurants);
                ps.setString(8, travelForum);
                System.out.println("PS:"+ps);
                return ps;
            }, keyHolder);
            return (String) keyHolder.getKeys().get("PLACE");
        }catch (Exception e) {
            throw new BadRequestException("Invalid request");
        }
    }

    private RowMapper<Search> searchRowMapper = ((rs, rowNum) -> {
        return new Search(rs.getInt("SEARCH_ID"),
                rs.getString("PLACE_ID"),
                rs.getString("PLACE"),
                rs.getString("DESCRIPTION"),
                rs.getString("TRAVEL_ADVICE"),
                rs.getString("HOTELS"),
                rs.getString("THINGS_TO_DO"),
                rs.getString("RESTAURANTS"),
                rs.getString("TRAVEL_FORUM"));
    });

}
