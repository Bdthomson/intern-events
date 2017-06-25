package com.blakethomson.IBM_Events.Event;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface EventRepository extends MongoRepository<Event, String> {

}

