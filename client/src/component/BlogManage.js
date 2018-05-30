import React, { Component } from 'react';
import '../public/BlogManage.css';

class BlogManage extends Component {
  constructor() {
    super();
    this.state = {
        content: [{
            title: "测试",
            createTime: "2014-08-15"
        }]
    }
  }
  componentDidMount() {
  }
  render() {
    let contentList = this.state.content;
        return (
            <div className="blogmanage">
                <div className="contentshow">
                    <div className="contentlist">
                        <p>文章列表</p>
                        <p>上传内容</p>
                    </div>
                    <ul>  
                        {
                            contentList.map(function(item){  
                                return <li><p>{item.title}</p><p>{item.createTime}</p><p>修改</p><p>删除</p></li>
                            })  
                        }  
                    </ul>
                </div>
                <div className="contentedit">
                </div>
            </div>
    );
  }
}

export default BlogManage;