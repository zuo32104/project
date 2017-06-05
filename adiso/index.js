//引入模块
	var express = require("express");
	var app = express();

	//设置静态资源的路径
	app.use(express.static('static'));
	app.use('/adiso', express.static('static'));

	//监听路由
	app.get("/adiso",function (req,res){
		res.sendFile(__dirname+'/index.html'); //返回页面
	})
	app.get("/adiso/*",function (req,res){
		res.sendFile(__dirname+'/index.html'); //返回页面
	})

	app.listen(80,function (){
		//启动服务成功，执行函数
		console.log("server start");		
	});
	