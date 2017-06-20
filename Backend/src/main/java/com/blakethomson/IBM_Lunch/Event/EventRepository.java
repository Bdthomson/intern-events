package com.blakethomson.IBM_Lunch.Event;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface EventRepository extends MongoRepository<Event, String> {

}

