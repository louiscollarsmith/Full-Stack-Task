package main

import (
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/louiscollarsmith/full-stack-task/utils"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.Use(utils.LogMiddleware())
	router.NotFoundHandler = handlers.LoggingHandler(os.Stdout, utils.Handle(404))
	router.MethodNotAllowedHandler = handlers.LoggingHandler(os.Stdout, utils.Handle(405))

	// Register routes
	router.HandleFunc("/time", getTime).Methods("GET")

	server := &http.Server{Addr: ":2002", Handler: router}
	if err := server.ListenAndServe(); err != nil {
		panic(err)
	}

}

type getTimeResponse struct {
	Time string `json:"time"`
}

func getTime(w http.ResponseWriter, r *http.Request) {
	utils.RespondSuccess(w, getTimeResponse{Time: time.Now().String()})
}
