package controllers

import (
	"encoding/json"
	"net/http"
	"quiz/models"
)

func RegisterEvent(w http.ResponseWriter, r *http.Request) {
	var event models.Event
	_ = json.NewDecoder(r.Body).Decode(&event)
	// Save event to database
	json.NewEncoder(w).Encode(event)
}

// Define other handlers for questions, rankings, etc.
