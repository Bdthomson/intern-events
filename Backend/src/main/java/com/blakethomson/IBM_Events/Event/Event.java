package com.blakethomson.IBM_Events.Event;

import com.blakethomson.IBM_Events.Guest.Guest;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

public @Data class Event {

    @Id
    private String id;
    private String type;
    private String creator;
    private String name;
    private String link;
    private String address;
    private String description;
    private String datetime;
    private boolean restricted;

    
    private List<Guest> guests = new ArrayList<>();

}
