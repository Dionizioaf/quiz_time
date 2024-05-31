package api

import (
	"net/http"

	"goquiz/internal/interfaces"

	"github.com/gin-gonic/gin"
)

func Game(api *gin.RouterGroup) {
	api.POST("/game/connect", gameConnectHandler)
}

// JokeHandler retrieves a list of available jokes
func gameConnectHandler(c *gin.Context) {
	var GameConnect interfaces.ApiGameConnect

	// Bind the incoming JSON payload to the requestBody struct
	if err := c.ShouldBindJSON(&GameConnect); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Process the data (for example, print it)
	c.JSON(http.StatusOK, gin.H{
		"message": "Jogo conectado com sucesso",
		"id":      GameConnect.Id,
		"uid":     "123",
	})
}
