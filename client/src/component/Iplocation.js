import React, { Component } from 'react';
import '../public/Iplocation.css';

class Iplocation extends Component {
  constructor() {
    super();
    this.state = {
        alert: '请输入合法IP地址',
        ip: '',
        ipmsg: {
          continent: '...',
          country: '...',
          organization: '...',
          latitude: '...',
          longitude: '...'
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
    
    //根据经纬度更新百度地图界面
    var updateMap = function(a, b) {
      var BMap = window.BMap;
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.enableScrollWheelZoom(true);
      var new_point = new BMap.Point(b,a);
      map.centerAndZoom(new_point,11);
      var marker = new BMap.Marker(new_point);  // 创建标注
	    map.addOverlay(marker);   // 将标注添加到地图中
      marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      map.panTo(new_point);
    }
    //ajax请求
    var self = this; 
    var xhr = new XMLHttpRequest();
    var ipadr = this.state.ip.trim();
    xhr.open('get', "/tool/ipLocation?ipAdr=" + ipadr);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data  = JSON.parse(xhr.responseText);
            if(data.code && data.code == 0) {
              self.setState({alert: data.msg});
            }
            else {
              self.setState({alert: "IP查询成功"});
              let getipmsg = {
                continent: data.continent ? data.continent.en : 'Not Found',
                country: data.country ? data.country.en : 'Not Found',
                organization: data.organization ? data.organization : 'Not Found',
                latitude: data.location.latitude ? data.location.latitude : 'Not Found',
                longitude: data.location.longitude ? data.location.longitude : 'Not Found'
              }
              updateMap(Number(getipmsg.latitude),Number(getipmsg.longitude));
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
              <p className="ipdet1">全球区域</p>
              <p className="ipdet2">{this.state.ipmsg.continent}</p>
            </div>
            <div className="ipdet">
              <p className="ipdet1">国家名称</p>
              <p className="ipdet2">{this.state.ipmsg.country}</p>
            </div>
            <div className="ipdet">
              <p className="ipdet1">定位信息</p>
              <p className="ipdet2">{this.state.ipmsg.organization}</p>
            </div>
            <div className="ipdet">
              <p className="ipdet1">地理信息</p>
              <p className="ipdet2">{this.state.ipmsg.latitude + " " + this.state.ipmsg.longitude}</p>
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