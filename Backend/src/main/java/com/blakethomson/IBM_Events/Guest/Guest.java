package com.blakethomson.IBM_Events.Guest;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public @Data class Guest {
    @Id
    private String id = new ObjectId().toString();
    private String name;
}
