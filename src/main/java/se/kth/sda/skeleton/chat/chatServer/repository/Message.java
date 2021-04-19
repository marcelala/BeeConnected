package se.kth.sda.skeleton.chat.chatServer.repository;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "MESSAGE")

public class Message implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "MESSAGE_ID", nullable = false)
    private int messageId;

    @Column(name = "MESSAGE")
    private String message;

    @Column(name = "USER_NAME")
    private String userName;

    @Column(name = "TIMESTAMP")
    private LocalDateTime timestamp;

}
