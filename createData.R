#install.packages("websocket")
#library(websocket)

setwd("c:/develop/helheartbeat/data")
ws=WebSocket$new('ws://127.0.0.1:8080',autoConnect=FALSE,accessLogChannels="all")
ws$onOpen(function(event){cat("Conn opened\n")})
ws$onMessage(function(event){cat("Got message\n")})
ws$onClose(function(event){cat("Conn closed\n")})
ws$onError(function(event){cat("Conn error\n")})
xx=ws$connect()




for (i in 1:1000){
  Sys.sleep(0.2)
  rval=runif(1, min=0, max=1)
  if ((i %% 10)==0) {rval=min(rval+0.8,1)}
  #write(rval,file="dat01.csv",append=TRUE)
  #ws$send(rval)
  #ws$send(charToRaw("rval"))
  #xx=ws$send(charToRaw("a"))
  #print(xx)
  xy=ws$send(("a"))
  print(xy)
  ws$close()
}