package main

import (
	myDataB "./database"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"github.com/pkg/errors"
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

func getDataFromJson(userData JsonStruct) (data map[string]interface{}, errConvert error) {

	defer func() {

		if err := recover(); err != nil {
			data = make(map[string]interface{})
			errConvert = errors.New("decode err")
		}

	}()

	return userData.Body.([]interface{})[0].(map[string]interface{}), nil
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
	fmt.Print("=============Login=============\n")
	makeCorsHeaders(&w)

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()

	var userData JsonStruct
	err := decoder.Decode(&userData)
	mapData, convertionError := getDataFromJson(userData)

	if err != nil || convertionError != nil {
		// SetErrors([]string{ET.DecodeError}, http.StatusBadRequest, &w)
		return
	}

	login := mapData["login"].(string)
	password := mapData["password"].(string)
	

	if !dh.dataBase.CheckUser(login) || password != dh.dataBase.GetPasswordByLogin(login){
		fmt.Println("Doesn't exit")
		return
	}

	

	fmt.Println(login)
	fmt.Println(password)

	json.NewEncoder(w).Encode(&JsonStruct{Body: "test"})
	(w).WriteHeader(http.StatusOK)

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
