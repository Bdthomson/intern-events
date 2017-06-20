package com.blakethomson.IBM_Lunch.Event;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EventController {


    public static final Logger logger = LoggerFactory.getLogger(EventController.class);

    @Autowired
    private EventService eventService;

    @RequestMapping("/events")
    public List<Event> getAllEvents(){
        List<Event> events = eventService.getAllEvents();
        return events;
    }

    @RequestMapping("events/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable String id){

        logger.info("Fetching event with id {}", id);
        Event event = eventService.getEventById(id);
        if(event == null){
            logger.error("Event with id {} not found.", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @RequestMapping(method=RequestMethod.POST, value="/events")
    public ResponseEntity<?> addEvent(@RequestBody Event event){

        logger.info("Adding event : {}", event);

        //TODO: Check for duplicate names.

        eventService.addEvent(event);

        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/events/{id}")
    public Event updateEvent(@RequestBody Event event, @PathVariable String id){
        eventService.updateEvent(event);
        return event;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/events/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id){
        eventService.deleteEventById(id);
        return new ResponseEntity<Event>(HttpStatus.NO_CONTENT);
    }


    // Guest Mappings

    @RequestMapping(method=RequestMethod.POST, value="/events/{id}/guests")
    public ResponseEntity<?> addEvent(@RequestBody Event event, @PathVariable String id){

        logger.info("Adding event : {}", event);

        //TODO: Check for duplicate names.

        eventService.addEvent(event);

        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

}
