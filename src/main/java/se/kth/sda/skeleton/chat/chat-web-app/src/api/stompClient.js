import SockJS from 'sockjs-client';
import {BASE_URL} from './baseApi';
import Stomp from 'stompjs';

//STOMP is the Simple (or Streaming) Text Oriented Messaging Protocol

let stompClient;

export function getOrCreateStompClient() {
  if (stompClient) {
    return stompClient;
  }
  const socket = new SockJS(`${BASE_URL}/chat`);
  stompClient = Stomp.over(socket);
  return stompClient;
}