import React, { Component } from 'react';
import '../public/BlogManage.css';

class BlogManage extends Component {
    constructor() {
        super();
        this.state = {
          value: "",
          re: "",
          alert: "点击按钮即可上传",
          title: "",
          index: 1
        }
      }
    
    // 更新state的title内容
    gettitle = (e) => {
        this.setState({title: e.target.value});
    }

    // markdown语法实时转换显示
    show = (e) => {
    var cont1 = e.target.value;
    var cont2 = marked(cont1);
    this.setState({value: cont1});
    this.setState({re: cont2});
    }

    // 文章内容上传
    upclick = () => {

        //引入index参数避免多次提交
        if (this.state.index == 1) {
            this.setState({index: 0});
            this.setState({alert: "正在上传..."});
            var self = this;

            //ajax请求 
            var xhr = new XMLHttpRequest();
            xhr.open('post', '/tool/blogupload' );
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            var mes = 'title=' + this.state.title + '&content=' + this.state.re;
            xhr.send(mes);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let data  = JSON.parse(xhr.responseText);
                    if (data.code == 0) {
                        self.setState({alert: data.msg});
                        this.setState({index: 1});
                    }
                    if (data.code == 1) {
                        self.setState({alert: data.msg});
                        this.setState({index: 1});
                    }
                }
            };
            xhr.onerror = function(){
                self.setState({alert: "上传请求超时"});
            }
        }
        else {
            this.setState({alert: "正在上传...请勿重复提交"});
        }
    }
    render() {
        let contentList = this.state.content;
            return (
                <div className="blogmanage">
                    <div className="contentupdate">
                        <div className="content1">
                            <input  className="title" type="text" value={this.state.title} onChange={this.gettitle} placeholder="请输入文章标题" />
                            <a className="qnylink" href="http://photo.163.com/m18290281992/#m=0&p=1" target="view_window" title="点击跳转到网易相册在线存储">引入图片外链</a>
                            <p className="ipalert">感谢网易相册提供技术支持</p>
                        </div>
                        <div className="content2">
                            <div className="contleft">
                                <textarea className="md" placeholder="请输入Markdown语法格式内容" onChange={this.show}>{this.state.value}</textarea>
                            </div>
                            <div className="contright">
                                <div className="re" dangerouslySetInnerHTML = {{__html: this.state.re}}></div>
                            </div>
                        </div>
                        <div className="submit">
                            <p className="button" onClick={this.upclick}>上传文章</p>
                            <p className="alert">{this.state.alert}</p>
                        </div>
                    </div>
                </div>
        );
    }
}

export default BlogManage;