package main

import (
	myDataB "./database"
	// "encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	// "time"
)

type DataHandler struct {
	dataBase *myDataB.DataBase
	//cookies
}

type JsonStruct struct {
	Body interface{} `json:"body,omitempty"`
	Err  []string    `json:"err,omitempty"`
}



func makeCorsHeaders(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Content-Type", "application/json")
}


func (dh DataHandler) Register(w http.ResponseWriter, r *http.Request) {
	
	// тут получение данных с сервера
	fmt.Print("=============REGISTER=============\n")
	makeCorsHeaders(&w)


}

func (dh DataHandler) Login(w http.ResponseWriter, r *http.Request) {

	// тут получение данных с сервера
	fmt.Print("=============Login=============\n")
	makeCorsHeaders(&w)

}

func main() {
	fmt.Print("main")
	server := mux.NewRouter()
	db := myDataB.NewDataBase()
	api := &(DataHandler{dataBase:&db})

	server.HandleFunc("/register",api.Register)
	server.HandleFunc("/login",api.Login)


	http.ListenAndServe(":3001", server)

}
