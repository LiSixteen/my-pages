$(loadJson);
var $josnData = null;
var index = 0;
var timer = -1;

function loadJson() {
	init();
}

function init() {//解析josn
	jQuery.getJSON("josn/projects.json", null, sucess);
}

function sucess(data) {
	$josnData = data;
	addTimer();
	addEvent();
}

function addTimer() {//跑马灯加timer
	timer = setInterval(infoChange, 3000);
}

function removeTimer() {//移除timer
	clearInterval(timer);
}

function infoChange() {
	show();
	if(index >= 4) {
		index = 0;
	} else {
		index++;
	}
}

function show() {//index：第几个项目，展示项目经验
	var $li = $(".navBtn>li");
	$li.css("background-color", "#FFFFFF");
	$li.eq(index).css("background-color", "#FF0000");
	var name = $josnData["name_" + index];
	var type = "游戏类型：" + $josnData["type_" + index];
	var language = "使用技术：" + $josnData["language_" + index];
	var jobs = "我的职责：" + $josnData["jobs_" + index];
	var img = $josnData["img_" + index];
	$("#projectName").text(name);
	$("#pjType").text(type);
	$("#pjLanguage").text(language);
	$("#jobs").text(jobs);
	$("#projectCont>img").attr("src", img);
}

function addEvent() { //侧边栏事件、遮罩事件、跑马灯事件
	var $li = $(".navBtn>li");
	$li.on("mouseover", handler);
	$li.on("mouseout", addTimer);
	var img = $("#projectCont>img");
	img.on("mouseover",imgOver);
	img.on("mouseout",imgOut);
	
	$("#menuButton").on("click",function(){
		$("#menuPanel").animate({right:"0"},"fast");
		$("#mask").fadeIn();
	});
	
	$("#mask").on("click",function(){
		$("#menuPanel").animate({right:"-300px"},"fast");
		$("#mask").fadeOut();
	});
	
	window.addEventListener("scroll",function(e){
		console.log("hhh");
	});
	
}

function handler(e) {
	var $li = $(".navBtn>li");
	$li.each(function(i,ele) {
		if(this == e.target) {
			index = i;
			removeTimer();
			show();
		}
	});
}

function imgOver(e){
	removeTimer();
}
function imgOut(e){
	addTimer();
}
