package main

import "github.com/gorilla/websocket"

type Hub struct {
	Clients []Client
}

func NewHub() *Hub {
	return &Hub{}
}

type Client struct {
	Conn *websocket.Conn
}

func NewClient() *Client {
	return &Client{}
}

type WSMessage struct {
	Type     string `json:"type"`
	Text     string `json:"text"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}
