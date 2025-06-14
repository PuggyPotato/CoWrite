package main


import(
	"log"

	socketio "github.com/googollee/go-socket.io"
	"github.com/gin-gonic/gin"
)


func main(){
	
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error{
		log.Println("connected:",s.ID())
		s.Emit("hello","Hello From Server!")
		return nil
	})

	server.OnEvent("/","message", func(s socketio.Conn,msg string){
		log.Println("message received",msg)
		s.Emit("reply","you said:" + msg)
	})

	server.OnDisconnect("/",func(s socketio.Conn,reason string){
		log.Println("disconnected:",reason)
	})

	go server.Serve()
	defer server.Close()

	router := gin.Default()

	router.GET("/socket.io/*any",gin.WrapH(server))
	router.POST("/socket.io/*any",gin.WrapH(server))

	router.Static("/static","./public")

	log.Println("Server started at http://localhost:3000")
	if err := router.Run(":3000"); err!= nil{
		log.Fatal("Gin Run Error:",err)
	}

}