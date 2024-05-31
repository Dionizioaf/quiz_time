package api

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func Router() (*gin.Engine, error) {
	// Set the router as the default one shipped with Gin
	router := gin.Default()
	router.Use(MiddlewareCors())
	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./web/static", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}
	Login(api)
	Game(api)
	jokes(api)

	// Start and run the server
	return router, nil
}
