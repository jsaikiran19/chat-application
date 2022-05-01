package main

import (
	"chat/utils"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"net/http"
	"os"
)

func main() {
	godotenv.Load()

	route := mux.NewRouter()
	AddApproutes(route)

	serverPath := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
	print(serverPath)
	cors := utils.GetCorsConfig()

	http.ListenAndServe(serverPath, cors.Handler(route))

}
