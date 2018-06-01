import React, { Component } from 'react';
import '../public/Iplocation.css';

class Iplocation extends Component {
  constructor() {
    super();
    this.state = {
        alert: '请输入合法IP地址',
        ip: '',
        ipmsg: {
          searchIp: '...',
          originIp: '...',
          addrMsg: '...',
          pointX: '...',
          pointY: ''
        }
    }
  }
  componentDidMount() {

    //百度地图初始化
    var BMap = window.BMap;
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404,39.915),11);
	  map.enableScrollWheelZoom(true);
  }

  //IP地址state更新
  getIp = (e) => {
    this.setState({ip: e.target.value});
  }

  //IP查询方法
  ipSearch = () => {
    this.setState({alert: "正在查询中..."});
    var self = this; 
    
    //根据经纬度更新百度地图界面
    var updateMap = function(a, b) {
      var BMap = window.BMap;
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.enableScrollWheelZoom(true);
      var new_point = new BMap.Point(a,b);
      map.centerAndZoom(new_point,11);
      var marker = new BMap.Marker(new_point);  // 创建标注
	    map.addOverlay(marker);   // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      map.panTo(new_point);
    }
    //ajax请求
    var xhr = new XMLHttpRequest();
    var ipadr = this.state.ip.trim();
    var getURL = "https://api.xiuyi.org/location?ip=" + ipadr + "&stamp=ee75c93f46d7e15e7731d4fe643b4dd0275fc2de";
    xhr.open('get', getURL );
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data  = JSON.parse(xhr.responseText);
            if (data.msg == "success") {
                self.setState({alert: "IP查询成功"});

                //更新state的IP查询数据信息
                let a = "", b="", c="", d="", e="";
                try {
                  if(data.xiuyi.address.formatted_address){
                    a = data.xiuyi.address.formatted_address;
                  }
                } catch (error) {
                  a = '...';
                }
                
                try {
                  if(data.xiuyi.address.sematic_description){
                    b = data.xiuyi.address.sematic_description;
                  }
                } catch (error) {
                  b = '...';
                }
                
                try {
                  if( a || b){
                    c = a + " " + b;
                  }else{
                    c = data.xiuyi.content.content.address ? data.xiuyi.content.content.address : (data.xiuyi.content || data.xiuyi.content.content);
                  }
                } catch (error) {
                  c = '...';
                }
                
                try {
                  d = data.xiuyi.content.content.point ? data.xiuyi.content.content.point.x : '...';
                } catch (error) {
                  d = '...';
                }

                try {
                  e = data.xiuyi.content.content.point ? data.xiuyi.content.content.point.y : '...';
                } catch (error) {
                  e = '...'
                }
                let getipmsg = {
                  searchIp: data.xiuyi.ip || "",
                  originIp: data.origin || "",
                  addrMsg: c,
                  pointX: d,
                  pointY: e
                }
                updateMap(Number(getipmsg.pointX),Number(getipmsg.pointY));
                self.setState({ipmsg: getipmsg});
            }
        }
    };
    xhr.onerror = function(){
        self.setState({alert: "IP查询请求超时"});
    }
}
  render() {
    return (
      <div className="iplct">
        <div className="ipsearch">
          <input type="text" className="ipinput" required value={this.state.ip} placeholder="请输入IP地址" onChange={this.getIp} />
          <p className="ipbutton" onClick={this.ipSearch}>查询</p>
          <p className="ipalert">{this.state.alert}</p>
        </div>
        <div className="ipshow">
          <div className="ipmsg">
            <div className="ipdet">
              <p className="ipdet1">查询IP</p>
              <p className="ipdet2">{this.state.ipmsg.searchIp}</p>
            </div>
            <div className="ipdet">
              <p className="ipdet1">本机IP</p>
              <p className="ipdet2">{this.state.ipmsg.originIp}</p>
            </div>
            <div className="ipdet">
              <p className="ipdet1">定位信息</p>
              <p className="ipdet2">{this.state.ipmsg.addrMsg}</p>
            </div>
            <div className="ipdet">
              <p className="ipdet1">地理信息</p>
              <p className="ipdet2">{this.state.ipmsg.pointX + " " + this.state.ipmsg.pointY}</p>
            </div>
          </div>
          <div className="baidumap">
            <div id="allmap"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Iplocation;