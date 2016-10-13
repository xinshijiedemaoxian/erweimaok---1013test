//引入依赖的模块
var http=require("http");


//引入express模块
var express=require("express");

//创建一个express程序
var app=express();

//创建web服务器
var httpServer=http.createServer(app);

//引入自定义的socketserver.js模块，并调用器listn方法
var socketServer=require("./scoketserver.js");
socketServer.listen(httpServer);

//指定静态资源处理的中间件
app.use(express.static("public"));

//创建服务器
httpServer.listen(8090,function(){
    console.log("服务器正运行在端口8090...");
});
