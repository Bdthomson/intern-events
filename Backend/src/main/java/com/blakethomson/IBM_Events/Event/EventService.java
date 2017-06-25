package com.blakethomson.IBM_Events.Event;

import com.blakethomson.IBM_Events.Guest.Guest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventRepository.findAll().forEach(events::add);
        return events;
    }

    public Event getEventById(String id) {
        return eventRepository.findOne(id);
    }

    public void addEvent(Event event) {
        eventRepository.save(event);
    }

    public void updateEvent(Event event) {
        eventRepository.save(event);
    }

    public void deleteEventById(String id){
        eventRepository.delete(id);
    }

    public void deleteAllEvents() {
        eventRepository.deleteAll();
    }

    public void addGuestToEvent(Guest guest, String eventId){
//        eventRepository.pushGuest(guest, eventId);
        Event temp = eventRepository.findOne(eventId);
        List<Guest> guests = temp.getGuests();
        guests.add(guest);
        temp.setGuests(guests);
        eventRepository.save(temp);
    }

    public void removeGuestFromEvent(String guestId, String eventId){
        Event temp = eventRepository.findOne(eventId);
        List<Guest> tempGuests = temp.getGuests();
        tempGuests.removeIf(guest -> guest.getId().equals(guestId));
        temp.setGuests(tempGuests);
        eventRepository.save(temp);
    }
}
