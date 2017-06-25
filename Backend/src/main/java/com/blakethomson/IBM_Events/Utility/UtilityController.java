package com.blakethomson.IBM_Events.Utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
public class UtilityController {

    @Autowired
    private com.blakethomson.IBM_Events.Event.EventService eventService;
    @Autowired

    @RequestMapping("/version")
    public Map<String, Integer> getVersion(){
        return Collections.singletonMap("version", 1);
    }

    @RequestMapping("/reset")
    public Map<String, String> resetDatabase(){

        try {
            eventService.deleteAllEvents();
        }catch(Exception e){
            return Collections.singletonMap("status", "Failed: " + e.toString());
        }

        return Collections.singletonMap("status", "Success");
    }
}
