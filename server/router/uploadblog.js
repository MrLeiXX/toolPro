var blogCont = require("../model/mongodbUploadblog.js");

module.exports = function(req, res){

    if (req.session.user) {
        let blogtitle = req.body.title;
        let blogcontent = req.body.content;
        let blogtime = new Date().toLocaleString();
        let blogid = blogtime.replace(/-| |:/g, "");


        //将文章存储到数据库中
        var newData = new blogCont({title: blogtitle, content: blogcontent, createtime: blogtime, pageid: blogid});
        newData.save(function(err, docs){
            if (err) {
                res.json({code: 0, msg: "文章上传失败"});
            }
            else {
                res.json({code: 1, msg: "文章上传成功"});
            }
            
        });
    }
    else {
        res.render('user');
    }
}