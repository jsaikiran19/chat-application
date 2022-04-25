package main

import (
	"chat/utils"
	"github.com/gorilla/mux"
	"net/http"
)

func main() {
	route := mux.NewRouter()
	AddApproutes(route)

	serverPath := ":8000"
	print(serverPath)
	cors := utils.GetCorsConfig()

	http.ListenAndServe(serverPath, cors.Handler(route))

}
