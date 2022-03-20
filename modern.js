function username_submit() {
    click.play();
    //finish();
    username = document.getElementById("username").value;
    if (username != "") {
        //temp
        bgm.play();

        localStorage.setItem("name", username);
        document.getElementById("username").style.display = 'none';
        document.getElementById("userbutton").style.display = 'none';
        document.getElementById("all").style.left = "0";
        map.centerAndZoom(landmarks[state].point, 16);
        //map.setCenter(landmarks[state].point);
        make_certificate();
        //console.log(map.getCenter());
    }
}

//sounds
var bgm = document.getElementById("bgm");
var book = document.getElementById("book");
var walk = document.getElementById("walk");
var click = document.getElementById("click");
var bird = document.getElementById("bird");

document.getElementById("history").style.display = 'none';
document.getElementById("gif").style.display = 'none';
document.getElementById("save").style.display = 'none';
var canvas = document.getElementById("canvas");
canvas.style.display = 'none';
var modern = document.getElementById("modern");
var body = modern.parentElement;
//mod.parentNode.removeChild(mod);
var question = document.getElementById("question");
question.style.display = 'none';
var introduction = document.getElementById("introduction");
introduction.style.display = 'none';
var picture = document.getElementById("pic");
picture.style.display = 'none';
picture.addEventListener("click", function() {
    this.style.display = 'none';
})
var question_text = document.getElementById("font");
var correct_answer = -1;
var username = "";

//按钮
function to_modern() {
    finish();
    click.play();
    document.getElementById("button2").style.backgroundImage = "url('img/button2.png')";
    document.getElementById("modern").style.display = 'block';
    document.getElementById("button1").style.backgroundImage = "url('img/button11.png')";
    document.getElementById("history").style.display = 'none';
    if(correct_answer != -1) {
        question.style.display = 'block';
    }
}
function to_history() {
    click.play();
    document.getElementById("button1").style.backgroundImage = "url('img/button1.png')";
    document.getElementById("history").style.display = 'block';
    document.getElementById("button2").style.backgroundImage = "url('img/button22.png')";
    document.getElementById("modern").style.display = 'none';
    question.style.display = 'none';
}
function answer_yes() {
    click.play();
    document.getElementById("choice1").style.backgroundImage = "url('img/choice_focus.png')";
    document.getElementById("choice2").style.backgroundImage = "url('img/choice.png')";
    if (correct_answer == 1) {
        document.getElementById("choice1").style.backgroundImage = "url('img/choice.png')";
        answer_correct();
    }
    else {
        answer_wrong(document.getElementById("choice1"));
    }
}
function answer_no() {
    click.play();
    document.getElementById("choice1").style.backgroundImage = "url('img/choice.png')";
    document.getElementById("choice2").style.backgroundImage = "url('img/choice_focus.png')";
    if (correct_answer == 0) {
        document.getElementById("choice2").style.backgroundImage = "url('img/choice.png')";
        answer_correct();
    }
    else {
        answer_wrong(document.getElementById("choice2"));
    }
}
function answer_correct() {
    correct_answer = -1;
    setTimeout(function(){
        question.style.display = 'none';
        document.getElementById("gif").style.display = 'block';
        bird.play();
        setTimeout(function() {
            document.getElementById("gif").style.display = 'none';
            if(state == 10) {
                finish();
                return;
            };
            map.setDisplayOptions({
                poi: false
            });
            landmarks[state-1].walk(50);
        }, 3700);
    },0);
}
function answer_wrong(this_choice) {
    let t1 = setInterval(function() {
        this_choice.style.left = "5%";
    }, 10);
    let t2 = setInterval(function() {
        this_choice.style.left = ("-5%");
    },20);
    let t3 = setInterval(function() {
        this_choice.style.left = ("0");
    }, 15);
    setTimeout(function() {
        window.clearInterval(t1);
        window.clearInterval(t2);
        window.clearInterval(t3);
        this_choice.style.left = "0";
        this_choice.style.backgroundImage = "url('img/choice.png')";
    }, 300);
}

function finish() {
    book.play();
    //document.getElementById("modern").style.display = 'none';
    
    canvas.style.display = 'block';
    document.getElementById("save").style.display = 'block';
    canvas.addEventListener("click", function() {
        //canvas.style.display = 'none';
        //document.getElementById("save").style.display = 'none';
        console.log(url);
        savePic(url);
    });
};



function savePic(Url){
    Url = this.dialogImgUrl //图片路径，也可以传值进来
    var triggerEvent = "touchstart"; //指定下载方式
    var blob=new Blob([''], {type:'application/octet-stream'}); //二进制大型对象blob
    var url = URL.createObjectURL(blob); //创建一个字符串路径空位
    var a = document.createElement('a'); //创建一个 a 标签
    a.href = Url;  //把路径赋到a标签的href上
    //正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
    a.download = "try_phone"; 
    /* var e = document.createEvent('MouseEvents');  //创建事件（MouseEvents鼠标事件）
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化鼠标事件（initMouseEvent已弃用）*/
    
    //代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
    var e = new MouseEvent('click', ( true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));  
    //派遣后，它将不再执行任何操作。执行保存到本地
    a.dispatchEvent(e); 
    //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
    URL.revokeObjectURL(url);  
    /* 
    //这段好像并不影响，所以我不用，注释掉
    var imgs = document.getElementsByTagName("img");
    for(var i = 0,o;o = imgs[i];i++){
        
        o.addEventListener(triggerEvent,function(){
            var newurl = this.getAttribute("src");
            saveAs(newurl);
        },false);
    } */
    
};




var landmarks = new Array();

//地图
var map = new BMapGL.Map("modern");
//map.addControl(new BMapGL.NavigationControl3D());
//map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别 
//map.setMapStyleV2({ styleId: 'e7c8f51a84922c56ac0884f7b85b2356' });
map.enableScrollWheelZoom(true);
map.setTilt(45);

//var style1 = new BMapGL.MapStyle("feathers: 'road point water building'");
//map.setMapStyleV2(style1);

//地标
function landmark(index, name, map_x, map_y, src, pic) {
    this.index = index;
    this.name = name;
    this.point = new BMapGL.Point(map_x, map_y);
    this.icon = new BMapGL.Icon(src, new BMapGL.Size(45, 45));
    this.marker = new BMapGL.Marker(this.point, {icon : this.icon});
    this.pic = pic;
    //this.marker = new BMapGL.Marker(this.point, {icon: myIcon});
    this.questions = [];
    this.introduction_word = [];
    this.on_introduction = 1;

    //modern
    this.marker.addEventListener("click", function() {
        if (index < 9)
            this.removeEventListener("click", arguments.callee);
        if (state == 10)
            finish();
        if (state > index)
            return;
        if(index <= 9) {
            state += 1;
            localStorage.setItem("state", state);
            //console.log(index, state);
            //landmarks[index+1].modern_init();
            //landmarks[index].walk(20);
        }
        book.play();
        question.style.display = 'block';
        question_text.innerHTML = landmarks[index].questions[0][0];
        document.getElementById("name").innerHTML = landmarks[index].name;
        correct_answer = landmarks[index].questions[0][1];
    });

    let id = "l" + index;
    //old
    document.getElementById(id).addEventListener("click", function() {
        book.play();
        landmarks[index].on_introduction = 1;
        document.getElementById("introduction_name").innerHTML = landmarks[index].name;
        document.getElementById("introduction_word").innerHTML = landmarks[index].introduction_word[0];
        introduction.style.display = "block";
        introduction.addEventListener("click", function() {
            book.play();
            //console.log(landmarks[index].on_introduction, landmarks[index].name);
            //alert("?");
            landmarks[index].on_introduction++;
            if(landmarks[index].on_introduction > landmarks[index].introduction_word.length) {
                this.style.display = 'none';
                introduction.removeEventListener("click", arguments.callee);
                picture.style.backgroundImage = landmarks[index].pic;
                picture.style.display = 'block';

            }
            else {
                document.getElementById("introduction_word").innerHTML = landmarks[index].introduction_word[landmarks[index].on_introduction-1];
            }
        });
    });
}
landmark.prototype.modern_init = function() {
    map.addOverlay(this.marker);
}

landmarks[0] = null;
landmarks[1] = new landmark(1, "国民政府交通部", 118.764077, 32.086597, "img/s1.png", "url('src/1.jpg')");
landmarks[2] = new landmark(2, "安全区国际委员会总部", 118.775927, 32.070405, "img/s2.png", "url('src/2.jpeg')");
landmarks[3] = new landmark(3, "华侨招待所", 118.782470, 32.071342, "img/s3.png", "url('src/3.jpeg')");
landmarks[4] = new landmark(4, "鼓楼医院", 118.789756, 32.063179, "img/s4.png", "url('src/4.jpg')");
landmarks[5] = new landmark(5, "赛珍珠纪念馆", 118.787487, 32.063273, "img/s5.png", "url('src/5.jpg')");
landmarks[6] = new landmark(6, "金陵大学", 118.784773, 32.061284, "img/s6.png", "url('src/6.jpg')");
landmarks[7] = new landmark(7, "金陵女子文理学院", 118.775830, 32.059739, "img/s7.png", "url('src/7.jpg')");
landmarks[8] = new landmark(8, "拉贝故居", 118.789863, 32.056754, "img/s8.png", "url('src/8.jpg')");
landmarks[9] = new landmark(9, "金陵神学院", 118.784569, 32.049938, "img/s9.png", "url('src/9.jpg')");
landmarks[1].modern_init();

//紫金草
var moveIcon = new BMapGL.Icon("img/icon.png", new BMapGL.Size(32, 60));
var moveMarker = new BMapGL.Marker(landmarks[1].point, {icon: moveIcon});
var pts = [[], [], [], [], [], [], [], []];//生成轨迹
var state;//状态

landmark.prototype.walk = function(speed) {
    if(speed != 0)
        walk.play();
    let index = this.index;
    landmarks[index+1].modern_init();
    var walking = new BMapGL.WalkingRoute(map);
    walking.search(this.point, landmarks[this.index+1].point);
    walking.setSearchCompleteCallback(function() {
        pts[index-1] = walking.getResults().getPlan(0).getRoute(0).getPath();

        if(speed == 0) {
            let poly = new BMapGL.Polyline(pts[index-1]);
            map.addOverlay(poly);
            return;
        }

        setTimeout(function () {   
            playvideo(index - 1, speed);
        }, 0);  
    })
};

function playvideo(index, speed) {   

    //轨迹动画
    let ptss = [pts[index][0]];
    let num = 0;
    pts[index].forEach(function(item) {
        if(item.lng != ptss[num].lng || item.lat != ptss[num].lat) {
            num++;
            ptss[num] = item;
        }
    });
    
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
            console.log(i);   
            setTimeout(function () {                  
            resetMkPoint(i);
            }, speed);         
        } 
        else {
            map.removeOverlay(moveMarker);
            walk.pause();
            map.setDisplayOptions({
                poi:true
            });
            //location.reload();



        }         
    }
    setTimeout(function () {         
    resetMkPoint(1);         
    }, speed);         
}

var url;

function make_certificate() {
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = "img/certificate.png";
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        ctx.font = "100px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(username, 1250, 2300);
        //var a = document.getElementById("a");
        url = canvas.toDataURL();
        //console.log(a.href);
        //a.setAttribute("href", url);
        //console.log(a.href);
    }
}

function init() {
    username = localStorage.getItem("name");
    if(username == null) {
        document.getElementById("all").style.left = "-100%";
    }
    else {
        document.getElementById("username").style.display = 'none';
        document.getElementById("userbutton").style.display = 'none';
        make_certificate();
    }

    //modern
    state = localStorage.getItem("state");
    if(state == null || state > 9) {
        state = 1;
        localStorage.setItem("state", state);
        map.centerAndZoom(landmarks[state].point, 16);
    }
    else {
        state = Number(state);
        for (i = 1; i < state; i++) {
            landmarks[i].walk(0);
        }
        map.centerAndZoom(landmarks[state].point, 16);
        if (state == 10) {
            map.centerAndZoom(landmarks[9].point, 16);
            finish();
        }
    }
    //console.log(landmarks[state].point);
    

    const file = new XMLHttpRequest();
    file.open("GET", "questions.txt", true);
    file.onload = function () {
        const allText = file.response;
        let texts = allText.split('\n');
        for (i = 0; i < texts.length; i++) {
            //console.log(texts[i]);
            let text = texts[i].split(' ');
            landmarks[text[0]].name = text[1];
            landmarks[text[0]].questions.push([text[2], text[3]]);
        }
    }
    file.send();
    
    const file_ = new XMLHttpRequest();
    file_.open("GET", "introduction.txt", true);
    file_.onload = function() {
        const allText_ = file_.response;
        let texts_ = allText_.split('\n');
        for (i = 0; i < texts_.length; i++) {
            let text_ = texts_[i].split(' ');
            for(j = 1; j < text_.length; j++) {
                landmarks[text_[0]].introduction_word.push(text_[j]);
            }
        }
    }
    file_.send();

    var preload_queue = [
        ["img/card_modern.png"],
        ["img/card_old.png"],
        ["src/1.jpg"],
        ["src/2.jpeg"],
        ["src/3.jpeg"],
        ["src/4.jpg"],
        ["src/5.jpg"],
        ["src/6.jpg"],
        ["src/7.jpg"],
        ["src/8.jpg"],
        ["src/9.jpg"]
    ];
    for(k = 0; k < preload_queue.length; k++) {
        var t = new Image();
        t.src = preload_queue[k];
    }

    
};init();

