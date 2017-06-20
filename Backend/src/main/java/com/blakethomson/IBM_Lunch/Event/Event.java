package com.blakethomson.IBM_Lunch.Event;


import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

public class Event {

    @Id
    private String id;
    private String type;
    private String name;
    private String link;
    private String address;
    private String description;
    private String datetime;

    public Event(String id, String type, String name, String link, String address, String description, String datetime, List<String> guests) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.link = link;
        this.address = address;
        this.description = description;
        this.datetime = datetime;
        this.guests = guests;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Place
     *  Name
     *  Address
     *  Link
     */



    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    private List<String> guests = new ArrayList<>();

    public List<String> getGuests() {

        return guests;
    }

    public void setGuests(List<String> guests) {
        this.guests = guests;
    }


    public Event(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
