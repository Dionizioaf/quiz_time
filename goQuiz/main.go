package main

import (
	"fmt"
	"goquiz/api"
)

func main() {
	router, _ := api.Router()
	router.Run(":3000")

	fmt.Println("Hello World")
}
