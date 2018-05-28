var userCont = require("../model/mongodbUser.js");
var crypto = require("crypto");

module.exports = function(req, res){

    if (!req.session.user) {
        let uname = req.body.name;
        let pwd = req.body.pwd;

        //验证是否有流量劫持（跳过前端过滤机制）
        if (uname.length > 10 || pwd.length > 10) {
            res.json({code: 0, msg: "请求失败"});
        }
        else {

            //密码md5加密
            pwd = crypto.createHash('md5').update(pwd).digest('hex');

            //添加账号密码专用操作
            // var newData = new userCont({name: uname, passWord: pwd});
            // newData.save(function(err, docs){
            //     if(err){
            //         console.log(err);
            //     }
            // });
        
            userCont.find({name: uname}, 'passWord', function(err, docs){
                if (err) {
                    res.send("{errCode: 502, errText: \"server is fail\"}");
                }
                if( docs.length == 1 && pwd == docs[0].passWord ){
                    req.session.user = {
                        uname: uname,
                        pwd: pwd,
                    };
                    res.json({code: 1, msg: "登陆成功"});
                }
                else {
                    res.json({code: 0, msg: "登陆失败"});
                }
            });
        }
    }
    else {
        res.render('index');
    }
}