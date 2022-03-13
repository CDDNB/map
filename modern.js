document.getElementById("modern").style.display = 'none';
document.getElementById("gif").style.display = 'none';
document.getElementById("canvas").style.display = 'none';
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

//按钮
function to_modern() {
    document.getElementById("button2").style.backgroundImage = "url('img/button2.png')";
    document.getElementById("modern").style.display = 'block';
    document.getElementById("button1").style.backgroundImage = "url('img/button11.png')";
    document.getElementById("history").style.display = 'none';
    if(correct_answer != -1) {
        question.style.display = 'block';
    }
}
function to_history() {
    document.getElementById("button1").style.backgroundImage = "url('img/button1.png')";
    document.getElementById("history").style.display = 'block';
    document.getElementById("button2").style.backgroundImage = "url('img/button22.png')";
    document.getElementById("modern").style.display = 'none';
    question.style.display = 'none';
}
function answer_yes() {
    document.getElementById("choice1").style.backgroundImage = "url('img/choice_focus.png')";
    document.getElementById("choice2").style.backgroundImage = "url('img/choice.png')";
    if (correct_answer == 1) {
        document.getElementById("choice1").style.backgroundImage = "url('img/choice.png')";
        answer_correct();
    }
}
function answer_no() {
    document.getElementById("choice1").style.backgroundImage = "url('img/choice.png')";
    document.getElementById("choice2").style.backgroundImage = "url('img/choice_focus.png')";
    if (correct_answer == 0) {
        document.getElementById("choice2").style.backgroundImage = "url('img/choice.png')";
        answer_correct();
    }
}
function answer_correct() {
    correct_answer = -1;
    setTimeout(function(){
        question.style.display = 'none';
        document.getElementById("gif").style.display = 'block';
        setTimeout(function() {
            document.getElementById("gif").style.display = 'none';
            landmarks[state-1].walk(20);
        }, 4000);
    },0);
}

function finish() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "40px Georgia";
    ctx.fillText("Mr. Peace", 0, 0);
    var img = new Image();
    img.src = "img/icon_raw.png";
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        //var a = document.getElementByIdById("a");
        //a.href = canvas.toDataURL();
    }
    canvas.addEventListener("click", function() {
        canvas.style.display = 'none';
    });
}

var landmarks = new Array();

//地图
var map = new BMapGL.Map("modern");
//map.addControl(new BMapGL.NavigationControl3D());
//map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别 
//map.setMapStyleV2({ styleId: 'e7c8f51a84922c56ac0884f7b85b2356' });
map.enableScrollWheelZoom(true);
map.setTilt(45);
map.setMapStyleV2({
    feathers: 'road point water building'
});

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
        this.removeEventListener("click", arguments.callee);
        question.style.display = 'block';
        question_text.innerHTML = landmarks[index].questions[0][0];
        document.getElementById("name").innerHTML = landmarks[index].name;
        correct_answer = landmarks[index].questions[0][1];
        if (state > index)
            return;
        if(index < 9) {
            state += 1;
            localStorage.setItem("state", state);
            //console.log(index, state);
            //landmarks[index+1].modern_init();
            //landmarks[index].walk(20);
        }
    });

    let id = "l" + index;
    //old
    document.getElementById(id).addEventListener("click", function() {
        landmarks[index].on_introduction = 1;
        document.getElementById("introduction_name").innerHTML = landmarks[index].name;
        document.getElementById("introduction_word").innerHTML = landmarks[index].introduction_word[0];
        introduction.style.display = "block";
        introduction.addEventListener("click", function() {
            //console.log(landmarks[index].on_introduction, landmarks[index].name);
            //alert("?");
            landmarks[index].on_introduction++;
            if(landmarks[index].on_introduction > landmarks[index].introduction_word.length) {
                this.style.display = 'none';
                introduction.removeEventListener("click", arguments.callee);
                picture.style.backgroundImage = pic;
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
landmarks[1] = new landmark(1, "国民政府交通部", 118.764077, 32.086597, "img/s1.png", "src/1.jpg");
landmarks[2] = new landmark(2, "安全区国际委员会总部", 118.775927, 32.070405, "img/s2.png", "src/2.jpeg");
landmarks[3] = new landmark(3, "华侨招待所", 118.782470, 32.071342, "img/s3.png", "src/3.jpeg");
landmarks[4] = new landmark(4, "鼓楼医院", 118.789756, 32.063179, "img/s4.png", "src/4.jpg");
landmarks[5] = new landmark(5, "赛珍珠纪念馆", 118.787487, 32.063273, "img/s5.png", "src/5.jpg");
landmarks[6] = new landmark(6, "金陵大学", 118.784773, 32.061284, "img/s6.png", "src/6.jpg");
landmarks[7] = new landmark(7, "金陵女子文理学院", 118.775830, 32.059739, "img/s7.png", "src/7.jpg");
landmarks[8] = new landmark(8, "拉贝故居", 118.789863, 32.056754, "img/s8.png", "src/8.jpg");
landmarks[9] = new landmark(9, "金陵神学院", 118.784569, 32.049938, "img/s9.png", "src/9.jpg");
landmarks[1].modern_init();

//紫金草
var moveIcon = new BMapGL.Icon("img/icon.png", new BMapGL.Size(32, 60));
var moveMarker = new BMapGL.Marker(landmarks[1].point, {icon: moveIcon});
var pts = [[], [], [], [], [], [], [], []];//生成轨迹
var state;//状态

landmark.prototype.walk = function(speed) {
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
            setTimeout(function () {                  
            resetMkPoint(i);
            }, speed);         
        } 
        else {
            map.removeOverlay(moveMarker);



            //location.reload();



        }         
    }
    setTimeout(function () {         
    resetMkPoint(1);         
    }, speed);         
}

function init() {
    //modern
    state = localStorage.getItem("state");
    if(state == null || state > 9) {
        state = 1;
        localStorage.setItem("state", state);
    }
    else {
        state = Number(state);
        for (i = 1; i < state; i++) {
            landmarks[i].walk(0);
        }
        if (state == 9) {
            finish();
        }
    }
    map.centerAndZoom(landmarks[state].point, 16);

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
    
};init();

