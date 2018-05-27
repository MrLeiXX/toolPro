import React, { Component } from 'react';
import '../public/Land.css';

class Land extends Component {
  render() {
    return (
        <div className="container">
            <div className="content">
                <form>
                    <div>
                        <span>用户名:</span>
                        <input className="input" required type="text" maxlength="10" name="userName" value=""/>
                    </div>
                    <div>
                        <span>密码:</span>
                        <input className="input sp" required type="password" maxlength="10" name="passWord" value=""/>
                    </div>
                    <div class="alert"><p>请输入账号密码</p></div>
                    <div>
                        <input className="submit" type="button" value="ok" />
                    </div>
                </form>
            </div>
        </div>
    );
  }
}

export default Land;