package se.kth.sda.skeleton.chat.chatServer.repository;

import se.kth.sda.skeleton.chat.chatServer.repository.Message;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CrudRepository<Message, Integer> {
}
