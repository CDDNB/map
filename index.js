var map = new BMapGL.Map("modern");
var point = new BMapGL.Point(118.78, 32.06);
map.centerAndZoom(point, 14); // 初始化地图，设置中心点坐标和地图级别 
map.setMapStyleV2({ styleId: 'e7c8f51a84922c56ac0884f7b85b2356' });
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
//var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
map.setTilt(45);
/*map.setDisplayOptions({
    poiText: false,  // 隐藏poi标注
    poiIcon: false,  // 隐藏poi图标
    //building: false  // 隐藏楼块
});*/

var myIcon = new BMapGL.Icon("img/lantern.png", new BMapGL.Size(32, 32));

// 创建Marker标注，使用孔明灯图标

var point = new Array();
var marker = new Array();
point[0] = new BMapGL.Point(118.784773, 32.061284);
point[1] = new BMapGL.Point(118.775927, 32.070405);
point[2] = new BMapGL.Point(118.789863, 32.056754);
point[3] = new BMapGL.Point(118.789756, 32.063179);
point[4] = new BMapGL.Point(118.787487, 32.063273);
point[5] = new BMapGL.Point(118.775830, 32.059739);
point[6] = new BMapGL.Point(118.784569, 32.049938);
point[7] = new BMapGL.Point(118.782470, 32.071342);
point[8] = new BMapGL.Point(118.764077, 32.086597);

function func() {
    t = document.getElementById("test");//.style.display = 'none';
    if (t.style.display == 'none') {
        document.getElementById("container").style.display = 'none';
        t.style.display = 'block';
    }
    else {
        t.style.display = 'none';
        document.getElementById("container").style.display = 'block';
    }
}

function func() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("GET", "1.txt", true);
    xhttp.send();
};func();

