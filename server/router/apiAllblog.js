var blogCont = require("../model/mongodbUploadblog.js");

module.exports = function(req, res){
    blogCont.find({}, {content: 0}, function(err, docs){
        if (err) {
            res.json({code: 0, msg: "查询失败"});
        }
        else {
            res.json({code: 1, msg: "查询成功", data: docs});
        }
    });
}