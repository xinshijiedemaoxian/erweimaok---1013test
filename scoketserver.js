/**
 * Created by hxsd on 2016/5/27.
 */
var socketio=require("socket.io");     //引入socket.io模板
var nodemailer = require('nodemailer');
module.exports.listen=function(httpServer){
    //让socketio模块监听httpServer(绑定)
    var io=socketio.listen(httpServer);   //io理解为10086

//服务器端会监听客户端的socket连接请求---会触发一个名为connection
//每当来一个客户端请求，服务端就会创建一个socket，由该socket负责
    io.on("connection",function(socket){
        //监听用户填写信息的事件
        socket.on("user_enter",function(data){
            //将输入信息保存到socket中
            socket.comName=data.comName;
            socket.idenF=data.idenF;
            socket.adrPhone=data.adrPhone;
            socket.bankCon=data.bankCon;
            var transporter = nodemailer.createTransport("smtp",{
                    host:"mail.hxjl.com.cn",
                    post:"25",
                    auth:{
                        user: 'tianxieji@hxjl.com.cn',
                        pass: '123456' //授权码
                    }
                }
            );
            var mailOptions = {
                from: 'tianxieji@hxjl.com.cn', // 发送者
                to: 'tianxieji@hxjl.com.cn', // 接受者,可以同时发送多个,以逗号隔开
                subject: '邮件发送', // 标题
                text: "1:" +data.comName+ "\r\n2:" +data.idenF+ "\r\n3:"+data.adrPhone+ "\r\n4:"+data.bankCon  // 文本
                //html: "<p>测试002</p>"
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('发送成功');
            });
        });
    });
};