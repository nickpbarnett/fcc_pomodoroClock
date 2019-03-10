var breakDec = document.querySelector("#breakDec");
var breakInc= document.querySelector("#breakInc");
var breakLength = document.querySelector("#breakLength");

var sessionDec = document.querySelector("#sessionDec");
var sessionInc= document.querySelector("#sessionInc");
var sessionLength = document.querySelector("#sessionLength");

var timerContainer=document.querySelector("#timerContainer");
var timer = document.querySelector("#timer");

var timerText=document.querySelector("#timerText");

var clear=document.querySelector("#clear");

var alarm = new Audio();
alarm.src = "sound.mp3";
function playAlarm() {
    alarm.play();
}


//var mins=1;
var sessionSecs=60;
var breakSecs=60;
var m;
var s;
var running=false;
var interval1;
var interval2;

//set and display break length
var x = 1;
breakDec.addEventListener("click", function(){
	if(x>1 && running==false){
		x-=1;
		breakLength.innerHTML=x;
	}
});

breakInc.addEventListener("click", function(){
	if(x>=1 && running==false){
		x+=1;
		breakLength.innerHTML=x;
	}
});

clear.addEventListener("click",function(){
	location.reload();
});

//set and display session length
var y=1;
sessionDec.addEventListener("click", function(){

	if(y>1 && running==false){
		y-=1;
		sessionLength.innerHTML=y;
		//timer.innerHTML=y;
	}
});

sessionInc.addEventListener("click", function(){
	if(y>=1 && running==false ){
		y+=1;
		sessionLength.innerHTML=y;

		//timer.innerHTML=y;
		sessionSecs=y*60;
	}
	
});


session();

function session(){
	// add event listener to timer container
	timerContainer.addEventListener("click",containerListener);
}

function containerListener(){
	if (running==false){
		running=true;
		interval1 = setInterval(function(){ sessionCountDown() }, 1000);
	}
}

function sessionCountDown(){

	timerContainer.classList.remove("orange");
	timerContainer.classList.add("green");
	timerText.innerHTML="Get working!";

	m=Math.floor(sessionSecs/60)*1;
	s=sessionSecs % 60 *1;

	if(s<10){
		s="0"+s;
	}
	timer.innerHTML=m+":"+s;
	sessionSecs=sessionSecs-1;
	if (sessionSecs==0){
		playAlarm();
		clearInterval(interval1);
		workBreak();
	}	
}

function workBreak(){
	breakSecs=x*60;
	interval2 = setInterval(function(){ breakCountDown() }, 1000);

	// add event listener to timer container
	timerContainer.removeEventListener("click",containerListener);
}



function breakCountDown(){
	timerContainer.classList.remove("green");
	timerContainer.classList.add("orange");
	timerText.innerHTML="Break Time!";

	m=Math.floor(breakSecs/60);
	s=breakSecs % 60;

	if(s<10){
		s="0"+s;
	}
	timer.innerHTML=m+":"+s;
	breakSecs=breakSecs-1;
	if (breakSecs<1){
		clearInterval(interval2);
		sessionSecs=y*60;
		running=false;
		playAlarm();
		containerListener();

	}	
}

