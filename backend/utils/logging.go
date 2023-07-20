package utils

import (
	"bytes"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type logResponseWriter struct {
	http.ResponseWriter
	statusCode int
	buf        bytes.Buffer
}

func LogMiddleware() mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			logRespWriter := &logResponseWriter{ResponseWriter: w}
			next.ServeHTTP(logRespWriter, r)
			fmt.Printf("[%s] %s %s %d %s \n", start.Format("2006-01-02 15:04:05.000"), r.Method, r.URL, logRespWriter.Code(), time.Since(start).String())
		})
	}
}

func Handle(status int) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(status) })
}

func (w *logResponseWriter) WriteHeader(code int) {
	w.statusCode = code
	w.ResponseWriter.WriteHeader(code)
}

func (w *logResponseWriter) Code() int {
	if w.statusCode == 0 {
		return 200
	}
	return w.statusCode
}

func (w *logResponseWriter) Write(body []byte) (int, error) {
	w.buf.Write(body)
	return w.ResponseWriter.Write(body)
}
