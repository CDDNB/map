document.getElementById("history").style.display = 'none';
var certificate = document.getElementById("certificate");
certificate.style.display = 'none';
certificate.addEventListener("click", function() {
    this.style.display = 'none';
})

//document.getElementById("button2").style.backgroundImage = "url('img/button1.jpeg')";//opacity = 0.5;

//按钮
function to_modern() {
    document.getElementById("button2").style.backgroundImage = "url('img/button2.png')";
    document.getElementById("modern").style.display = 'block';
    document.getElementById("button1").style.backgroundImage = "url('img/button11.png')";
    document.getElementById("history").style.display = 'none';
}
function to_history() {
    document.getElementById("button1").style.backgroundImage = "url('img/button1.png')";
    document.getElementById("history").style.display = 'block';
    document.getElementById("button2").style.backgroundImage = "url('img/button22.png')";
    document.getElementById("modern").style.display = 'none';
}

var landmarks = new Array();

//地图
var map = new BMapGL.Map("modern");
var rub = new BMapGL.Map("rub");
var point = new BMapGL.Point(118.764077, 32.086597);//118.78, 32.06);
map.addControl(new BMapGL.NavigationControl3D());
map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别 
map.setMapStyleV2({ styleId: 'e7c8f51a84922c56ac0884f7b85b2356' });
map.enableScrollWheelZoom(true);
map.setTilt(45);

//地标
function landmark(index, map_x, map_y, src, img) {
    this.index = index;
    this.point = new BMapGL.Point(map_x, map_y);
    this.icon = new BMapGL.Icon(src, new BMapGL.Size(45, 45));
    this.marker = new BMapGL.Marker(this.point, {icon : this.icon});
    //this.marker = new BMapGL.Marker(this.point, {icon: myIcon});
    this.img = img;
    this.marker.addEventListener("click", function() {
        this.removeEventListener("click", arguments.callee);
        if(index < 9) {
            landmarks[index+1].modern_init();
            landmarks[index].walk();
        }
        else {
            certificate.style.display = 'block';
        }
    });
}
landmark.prototype.modern_init = function() {
    map.addOverlay(this.marker);
}

landmarks[0] = new landmark(0, 0, 0, 0, 0);
landmarks[1] = new landmark(1, 118.764077, 32.086597, "img/s1.png", document.getElementById("l1"));
landmarks[2] = new landmark(2, 118.775927, 32.070405, "img/s2.png", document.getElementById("l2"));
landmarks[3] = new landmark(3, 118.782470, 32.071342, "img/s3.png", document.getElementById("l3"));
landmarks[4] = new landmark(4, 118.789756, 32.063179, "img/s4.png", document.getElementById("l4"));
landmarks[5] = new landmark(5, 118.787487, 32.063273, "img/s5.png", document.getElementById("l5"));
landmarks[6] = new landmark(6, 118.784773, 32.061284, "img/s6.png", document.getElementById("l6"));
landmarks[7] = new landmark(7, 118.775830, 32.059739, "img/s7.png", document.getElementById("l7"));
landmarks[8] = new landmark(8, 118.789863, 32.056754, "img/s8.png", document.getElementById("l8"));
landmarks[9] = new landmark(9, 118.784569, 32.049938, "img/s9.png", document.getElementById("l9"));
landmarks[1].modern_init();

//紫金草
var moveIcon = new BMapGL.Icon("img/icon.png", new BMapGL.Size(32, 60));
var moveMarker = new BMapGL.Marker(landmarks[1].point, {icon: moveIcon});
var pts = [];//生成轨迹
var state = 1;//状态

landmark.prototype.walk = function() {
    var walking = new BMapGL.WalkingRoute(map);
    walking.search(this.point, landmarks[this.index+1].point);
    walking.setSearchCompleteCallback(function() {
        pts = walking.getResults().getPlan(0).getRoute(0).getPath();
        setTimeout(function () {   
            map.setDisplayOptions({
                poiText: false,  // 隐藏poi标注
                poiIcon: false,  // 隐藏poi图标
            });      
            playvideo();
        }, 1000);  
    })
};

function playvideo() {   

    //轨迹动画
    let ptss = [pts[0]];
    let num = 0;
    pts.forEach(function(item) {
        if(item.lng != ptss[num].lng || item.lat != ptss[num].lat) {
            num++;
            ptss[num] = item;
        }
    });

    /*let ptsss = [];
    //alert(ptss.length);
    for (i = 0; i < 35; i++) {
        ptsss[i] = ptss[i];
        //console.log(ptsss[i]);
    }

    let pl = new BMapGL.Polyline(ptsss);
    let trackAni = new BMapGLLib.TrackAnimation(map, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 45,          // 轨迹播放的角度，默认为55
        duration: 500,   // 动画持续时长，默认为10000，单位ms
        //delay: 3000        // 动画开始的延迟，默认0，单位ms
    }); 
    trackAni.start();   
    
    for (i = 0; i < 35; i++) {
        ptsss[i] = ptss[35+i];
    }

    pl = new BMapGL.Polyline(ptsss);
    trackAni = new BMapGLLib.TrackAnimation(map, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 45,          // 轨迹播放的角度，默认为55
        duration: 500,   // 动画持续时长，默认为10000，单位ms
        delay: 501        // 动画开始的延迟，默认0，单位ms
    }); 
    trackAni.start();   

    for (i = 0; i < 35; i++) {
        ptsss[i] = ptss[75+i];
    }

    pl = new BMapGL.Polyline(ptsss);
    trackAni = new BMapGLLib.TrackAnimation(map, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 45,          // 轨迹播放的角度，默认为55
        duration: 5000,   // 动画持续时长，默认为10000，单位ms
        delay: 1002        // 动画开始的延迟，默认0，单位ms
    }); 
    trackAni.start();  */ 
    
    map.addOverlay(moveMarker);         
    var i = 0;         
    function resetMkPoint(i) {

        //trace
        let ptsss = [ptss[i-1], ptss[i]];
        let pl = new BMapGL.Polyline(ptsss);
        let trackAni = new BMapGLLib.TrackAnimation(map, pl, {
            overallView: false, // 动画完成后自动调整视野到总览
            tilt: 45,          // 轨迹播放的角度，默认为55
            duration: 10,   // 动画持续时长，默认为10000，单位ms
            zoom: 16
        //delay: 3000        // 动画开始的延迟，默认0，单位ms
        }); 
        trackAni.start();

        //marker
        moveMarker.setPosition(ptss[i]);
        i++;         
        if (i < ptss.length) {         
            setTimeout(function () {                  
            resetMkPoint(i);
            }, 20);         
        } 
        else {
            map.removeOverlay(moveMarker);
            map.setDisplayOptions({
                poiText: true,  // 隐藏poi标注
                poiIcon: true,  // 隐藏poi图标
            });
        }         
    }
    setTimeout(function () {         
    resetMkPoint(1);         
    }, 2)         
}

