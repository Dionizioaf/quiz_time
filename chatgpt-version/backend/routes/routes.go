package routes

import (
	"quiz/controllers"

	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/admin/event", controllers.RegisterEvent).Methods("POST")
	// Define other routes for questions, rankings, etc.
}
