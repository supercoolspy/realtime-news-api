import { io } from "npm:socket.io-client"
import { EventEmitter } from 'node:events';

export function init(customFilter: string | undefined): EventEmitter {
  let filter!: string
  if (customFilter === undefined) {
    filter = "all"
  } else {
    filter = customFilter
  }

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
