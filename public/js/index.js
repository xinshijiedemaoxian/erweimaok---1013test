/**
 * Created by Administrator on 2016-10-13.
 */
//调用io()方法，连接服务器，并获得客户端socket对象
var clientScoket = io();      //类似于向10086打电话
    $(function(){
        var qrcode = new QRCode(document.getElementById("qrcode"), {});
        //点击btn按钮执行生成二维码，并发送邮件
        $("#btn").click(function(){
            makeCode();
            //获取公司名称
            var comName = $("#companyname").val();
            //获取纳税人识别号
            var idenF = $("#identifier").val();
            //地址及电话
            var adrPhone = $("#address").val();
            //开户行及账号
            var bankCon = $("#bank").val();
            //将输入信息发送服务器
            clientScoket.emit("user_enter", {comName: comName, idenF: idenF, adrPhone: adrPhone, bankCon: bankCon});
        });

        //点击关闭结果页面
        closeResult();

        $("#text").on("blur", function() {
            makeCode();
        }).on("keydown", function(e) {
            if(e.keyCode == 13) {
                makeCode();
            }
        });
        //生成二维码函数
        function makeCode() {
            /*document.getElementById("result_content").style.display = "block";*/
            $("#result_content").show(300);
            var name = document.getElementById("companyname").value;
            var identifier = document.getElementById("identifier").value;
            var address = document.getElementById("address").value;
            var bank = document.getElementById("bank").value;
            var elText = document.getElementById("text").value;
            elText = "1:" + name + "\r\n2:" + identifier + "\r\n3:" + address + "\r\n4:" + bank + "\r\n"

            var elText2 = "公司名称:北京华夏聚龙自动化股份公司\r\n纳税人识别号:911101097481361512\r\n地址：北京市丰台区南四环西路188号" +
                "（总部基地）十区27号楼电话:010-52256809\r\n开户行及账号:交通银行北京丰台支行110061242018010079265";
            qrcode.makeCode(elText);

        };
    });
//点击关闭结果页面
function closeResult() {
    $("#result_content").hide(300);
//				location.reload()
}