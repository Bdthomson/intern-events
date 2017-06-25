package com.blakethomson.IBM_Events.Event;

import com.blakethomson.IBM_Events.Guest.Guest;
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
//
    @RequestMapping(method=RequestMethod.POST, value="/events/{eventId}/guests")
    public ResponseEntity<?> addGuest(@RequestBody Guest guest, @PathVariable String eventId){

        logger.info("Adding guest : {}", guest);

        //TODO: Check for duplicate names.

        eventService.addGuestToEvent(guest, eventId);

        return new ResponseEntity<>(guest, HttpStatus.CREATED);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/events/{eventId}/guests/{id}")
    public ResponseEntity<?> removeGuest(@PathVariable String eventId, @PathVariable String id){

        logger.info("Removing guest with id : {}", id);

        //TODO: Check for duplicate names.

        eventService.removeGuestFromEvent(id, eventId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
