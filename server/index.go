package main


import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
)

type UserInput struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

type User struct {
	ID       uint64 `json:"id"`
	Name     string `json:"name"`
	Password string `json:"-"`
}

type Handlers struct {
	users []User
	mu    *sync.Mutex
}

func (h *Handlers) HandleCreateUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	decoder := json.NewDecoder(r.Body)

	newUserInput := new(UserInput)
	err := decoder.Decode(newUserInput)
	if err != nil {
		log.Printf("error while unmarshalling JSON: %s", err)
		w.Write([]byte("{}"))
		return
	}

	fmt.Println(newUserInput)
	h.mu.Lock()

	var id uint64 = 0
	if len(h.users) > 0 {
		id = h.users[len(h.users)-1].ID + 1
	}

	h.users = append(h.users, User{
		ID:       id,
		Name:     newUserInput.Name,
		Password: newUserInput.Password,
	})
	h.mu.Unlock()
}

func (h *Handlers) HandleListUsers(w http.ResponseWriter, r *http.Request) {
	encoder := json.NewEncoder(w)
	h.mu.Lock()
	err := encoder.Encode(h.users)
	h.mu.Unlock()
	if err != nil {
		log.Printf("error while marshalling JSON: %s", err)
		w.Write([]byte("{}"))
		return
	}
}

func main() {
	handlers := Handlers{
		users: make([]User, 0),
		mu:    &sync.Mutex{},
	}
	fmt.Println("main")

	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("login")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("{}"))

		
		// fmt.Println(r)
	})

	http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
	
		log.Println(r.URL.Path)

		if r.Method == http.MethodPost {
			handlers.HandleCreateUser(w, r)
			return
		}

		handlers.HandleListUsers(w, r)
	})

	http.ListenAndServe(":3001", nil)
}