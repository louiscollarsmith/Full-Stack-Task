package utils

import (
	"encoding/json"
	"net/http"
)

type errResponse struct {
	Error string `json:"error"`
}

func RespondError(w http.ResponseWriter, err error) {
	response := errResponse{Error: err.Error()}
	status := http.StatusBadRequest

	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")
	writeJSON(w, response)
}

func RespondSuccess(w http.ResponseWriter, body interface{}) {
	status := http.StatusNoContent
	if body == nil {
		w.WriteHeader(status)
	}

	if body != nil {
		w.Header().Set("Content-Type", "application/json")
		writeJSON(w, body)
	}
}

func writeJSON(w http.ResponseWriter, payload interface{}) {
	enc := json.NewEncoder(w)
	enc.SetIndent("", "    ")
	_ = enc.Encode(payload)
}
