package main

import (
	"chat/handlers"
	"github.com/gorilla/mux"
	"log"
)

// AddApproutes will add the routes for the application
func AddApproutes(route *mux.Router) {

	log.Println("Loading Routes...")

	route.HandleFunc("/getUser", handlers.GetUser).Methods("POST")

	route.HandleFunc("/getUserOrgDetails/{userId}", handlers.GetUserOrgDetails)

	route.HandleFunc("/getUserProfile/{userId}", handlers.GetUserProfile)

	route.HandleFunc("/updateUserProfile", handlers.UpdateUserProfile).Methods("POST")

	route.HandleFunc("/getOrg", handlers.GetOrg)

	route.HandleFunc("/userOrgDetails", handlers.AddUserOrgDetails).Methods("PUT")

	route.HandleFunc("/orgDetails", handlers.AddOrg).Methods("PUT")

	route.HandleFunc("/userDetails", handlers.AddUser).Methods("PUT")

	route.HandleFunc("/getOrgLevelUsers/{OrgId}", handlers.GetOrgLevelUsers)

	route.HandleFunc("/getMessages", handlers.GetMessages).Methods("POST")

	route.HandleFunc("/putMessages", handlers.PutMessage).Methods("PUT")

	log.Println("Routes are Loaded.")
}
