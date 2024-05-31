package api

import (
	"net/http"

	"goquiz/internal/interfaces"

	"github.com/gin-gonic/gin"
)

func Login(api *gin.RouterGroup) {
	api.POST("/client/register", registerClientHandler)
}

// JokeHandler retrieves a list of available jokes
func registerClientHandler(c *gin.Context) {
	var ClientRegister interfaces.ClientRegister

	// Bind the incoming JSON payload to the requestBody struct
	if err := c.ShouldBindJSON(&ClientRegister); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Process the data (for example, print it)
	c.JSON(http.StatusOK, gin.H{
		"message": "Usuário registrado com sucesso",
		"id":      ClientRegister.Id,
		"name":    ClientRegister.Name,
		"uuid":    "123",
	})
}
