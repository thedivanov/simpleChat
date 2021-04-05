package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	hub = NewHub()
)

func main() {
	handler := http.NewServeMux()
	handler.Handle("/", http.StripPrefix("/static/", http.FileServer(http.Dir("./src/static"))))
	handler.HandleFunc("/ws/chat", wsHandler)

	server := http.Server{}
	server.Addr = ":8080"
	server.ReadTimeout = 10 * time.Second
	server.WriteTimeout = 10 * time.Second
	server.Handler = handler
	server.MaxHeaderBytes = 1 << 20

	log.Println("Server is starting...")

	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	client := NewClient()
	client.Conn = ws
	hub.Clients = append(hub.Clients, *client)

	for {
		_, mess, err := ws.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		var wsMessage WSMessage

		err = json.Unmarshal(mess, &wsMessage)
		if err != nil {
			log.Println(err)
		}

		switch wsMessage.Type {
		case "sendMSG":
			var wsMessageResponse WSMessage
			wsMessageResponse.Type = "newMSG"
			wsMessageResponse.Text = wsMessage.Text
			wsMessageResponse.Avatar = wsMessage.Avatar
			wsMessageResponse.Username = wsMessage.Username

			for _, cl := range hub.Clients {
				cl.Conn.WriteJSON(wsMessageResponse)
			}
		}

	}
}
