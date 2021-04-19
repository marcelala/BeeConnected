package se.kth.sda.skeleton.chat.chatServer.message;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import java.io.Serializable;
import java.time.LocalDateTime;

public class MessageDto implements Serializable {

    private String content;
    private String userName;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime timestamp;

    public static MessageDto fromMessage(Message message) {
        return MessageDto.builder()
                .content(message.getMessage())
                .userName(message.getUserName())
                .timestamp(message.getTimestamp())
                .build();
    }

}
