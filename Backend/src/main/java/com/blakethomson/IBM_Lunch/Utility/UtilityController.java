package com.blakethomson.IBM_Lunch.Utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtilityController {

    @Autowired
    private com.blakethomson.IBM_Lunch.Event.EventService eventService;
    @Autowired

    @RequestMapping("/version")
    public String getVersion(){
        return "Version 1";
    }

    @RequestMapping("/reset")
    public String resetDatabase(){

        try {
            eventService.deleteAllEvents();
        }catch(Exception e){
            return "Failed: " + e.toString();
        }

        return "Success";
    }
}
