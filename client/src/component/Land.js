import React, { Component } from 'react';
import '../public/Land.css';

class Land extends Component {
    constructor() {
        super();
        this.state = {
            alert: '请输入账号密码',
            name: '',
            pwd: ''
        }
    }
    getName = (e) => {
        this.setState({name: e.target.value});
    }
    getPwd = (e) => {
        this.setState({pwd: e.target.value});
    }
    userLogin = () => {
        this.setState({alert: "正在登陆..."});
        var self = this;

        //ajax请求 
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/tool/userlogin' );
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        var mes = 'name=' + this.state.name + '&pwd=' + this.state.pwd;
        xhr.send(mes);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data  = JSON.parse(xhr.responseText);
                if (data.code == 0) {
                    self.setState({alert: data.msg});
                }
                if (data.code == 1) {
                    self.setState({alert: data.msg});
                    setTimeout(function(){
                        window.location.href="http://118.25.219.38/";
                    },1000);
                }
            }
        };
        xhr.onerror = function(){
            self.setState({alert: "请求超时"});
        }
    }
    render() {
        return (
            <div>
                <div id="wrapper">
                    <canvas id="canvas" width="1950px" height="800px"></canvas>
                    <canvas id="canvasbg" width="1950px" height="800px"></canvas>
                </div>
                <div className="container">
                    <div className="content">
                        <form ref="getValue">
                            <div>
                                <input className="input" onChange={this.getName} required type="text" maxLength="10" name="userName" value={this.state.name} placeholder=" 账号" />
                            </div>
                            <div>
                                <input className="input sp" onChange={this.getPwd} required type="password" maxLength="10" name="passWord" value={this.state.pwd} placeholder=" 密码" />
                            </div>
                            <div className="alert">
                                <p>{this.state.alert}</p>
                            </div>
                            <div>
                                <p className="submit" onClick={this.userLogin}>登陆</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Land;