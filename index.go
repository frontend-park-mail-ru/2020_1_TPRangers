package main


import (
	"encoding/json"
	// "encoding/json"
	"fmt"
	"io/ioutil"

	// "log"
	"net/http"
	// "sync"

)

type Message struct {
Name string `json:"name"`
}


func makeCorsHeaders(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Content-Type", "application/json")
}

func main() {
	fmt.Println("main")

	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("login")
		makeCorsHeaders(&w)
		body, _ := ioutil.ReadAll(r.Body)
		var msg Message
		json.Unmarshal(body, &msg)
		fmt.Println(msg)
		w.Write([]byte(`{"text":"hello"}`))
	})

	http.ListenAndServe(":3001", nil)
}