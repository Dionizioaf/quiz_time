package api

import (
	"net/http"
	"strconv"

	"goquiz/configs"

	"github.com/gin-gonic/gin"
)

func jokes(api *gin.RouterGroup) {
	// ... leave the code above untouched...

	// Our API will consit of just two routes
	// /jokes - which will retrieve a list of jokes a user can see
	// /jokes/like/:jokeID - which will capture likes sent to a particular joke
	api.GET("/jokes", JokeHandler)
	api.POST("/jokes/like/:jokeID", LikeJoke)
}

// JokeHandler retrieves a list of available jokes
func JokeHandler(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, configs.Jokes)
}

// LikeJoke increments the likes of a particular joke Item
func LikeJoke(c *gin.Context) {
	// confirm Joke ID sent is valid
	// remember to import the `strconv` package
	if jokeid, err := strconv.Atoi(c.Param("jokeID")); err == nil {
		// find joke, and increment likes
		for i := 0; i < len(configs.Jokes); i++ {
			if configs.Jokes[i].ID == jokeid {
				configs.Jokes[i].Likes += 1
			}
		}
		// return a pointer to the updated jokes list
		c.JSON(http.StatusOK, &configs.Jokes)
	} else {
		// Joke ID is invalid
		c.AbortWithStatus(http.StatusNotFound)
	}
}
