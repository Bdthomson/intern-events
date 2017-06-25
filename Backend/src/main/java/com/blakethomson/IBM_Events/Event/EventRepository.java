package com.blakethomson.IBM_Events.Event;

import com.blakethomson.IBM_Events.Guest.Guest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface EventRepository extends MongoRepository<Event, String> {
}

