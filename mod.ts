import { io } from "npm:socket.io-client@4.8.0"
import { EventEmitter } from 'node:events';

/**
 * Initializes the socket.io client
 * @param filter The article filter to apply. Default is no filter
 * @returns Event Emitter for when articles are recieved
 */
export function init(filter: string = "all"): EventEmitter {
  const socket = io("https://api.newsfilter.io")
  socket.on("connect", () => {
    socket.emit("action", {
      type: "subscribe",
      filterId: filter
    })
  })

  const emitter = new EventEmitter()

  socket.on("articles", (articles: []) => {
    if (articles.length > 0) {
      emitter.emit('articles', articles);
    }
  })
  
  return emitter
}
