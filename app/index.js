var express = require('express');
var app= express();
var http = require('http').Server(app);
var io=require('socket.io')(http);
var fs=require('fs');
var gpio = require('rpi-gpio');
var Player=require('player');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./test.db');
var nodemailer = require("nodemailer");
var ip = require('ip');
var random = require("node-random");

var btnrandom=0;
var btnrandom2;
var btn_startrandom;
var questrandom=0;
var ranquest=0;
var point_true=0;
var point_false=0;
var checkdb=0;
var sta1=0,sta2=0;
var question=0;
var answer=0;
var check=0;
var pointtall=0;
var pointfall=0;
var status_sound=0;
var io1,io2,io3,io4,io5,io6;

var email,title;
var sendemail=0;
var mailOptions;

var data_msq;

//user
var numtest;
var senduser=0;
var status_test=0;
var status_add,status_delete;
var nameuser,nameuser_test;
var stmt;

ip.address()
var ipuser=ip.address();
console.log(ipuser);


var Stopwatch = require('timer-stopwatch');
var timer = new Stopwatch(60000);

var status_count;
var check_count;
var timecount;
var time_update;
var false_time=0;
var check_timetrue;
// log it out every time it's updated 
var time_a;
timer.onTime(function(time) {
	time_a=(time.ms/1000);
    
});

app.use(express.static(__dirname+'/sound'));

var play1 = new Player('./sound/ก.mp3'),
    play2 = new Player('./sound/ข.mp3'),
    play101 = new Player('./sound/ture.mp3'),
    play102 = new Player('./sound/false.mp3'),
    play103 = new Player('./sound/question.mp3'),
    play3 = new Player('./sound/ฃ.mp3'),
	play4 = new Player('./sound/ค.mp3'),
	play5 = new Player('./sound/ฅ.mp3'),
	play6 = new Player('./sound/ฆ.mp3'),
	play7 = new Player('./sound/ง.mp3'),
	play8 = new Player('./sound/จ.mp3'),
	play9 = new Player('./sound/ฉ.mp3'),
	play10 = new Player('./sound/ช.mp3'),
	play11 = new Player('./sound/ซ.mp3'),
	play12 = new Player('./sound/ฌ.mp3'),
	play13 = new Player('./sound/ญ.mp3'),
	play14 = new Player('./sound/ฎ.mp3'),
	play15 = new Player('./sound/ฏ.mp3'),
	play16 = new Player('./sound/ฐ.mp3'),
	play17 = new Player('./sound/ฑ.mp3'),
	play18 = new Player('./sound/ฒ.mp3'),
	play19 = new Player('./sound/ณ.mp3'),
	play20 = new Player('./sound/ด.mp3'),
	play21 = new Player('./sound/ต.mp3'),
	play22 = new Player('./sound/ถ.mp3'),
	play23 = new Player('./sound/ท.mp3'),
	play24 = new Player('./sound/ธ.mp3'),
	play25 = new Player('./sound/น.mp3'),
	play26 = new Player('./sound/บ.mp3'),
	play27 = new Player('./sound/ป.mp3'),
	play28 = new Player('./sound/ผ.mp3'),
	play29 = new Player('./sound/ฝ.mp3'),
	play30 = new Player('./sound/พ.mp3'),
	play31 = new Player('./sound/ฟ.mp3'),
	play32 = new Player('./sound/ภ.mp3'),
	play33 = new Player('./sound/ม.mp3'),
	play34 = new Player('./sound/ย.mp3'),
	play35 = new Player('./sound/ร.mp3'),
	play36 = new Player('./sound/ล.mp3'),
	play37 = new Player('./sound/ว.mp3'),
	play38 = new Player('./sound/ศ.mp3'),
	play39 = new Player('./sound/ษ.mp3'),
	play40 = new Player('./sound/ส.mp3'),
	play41 = new Player('./sound/ห.mp3'),
	play42 = new Player('./sound/ฬ.mp3'),
	play43 = new Player('./sound/อ.mp3'),
    play44 = new Player('./sound/ฮ.mp3');


play101.on('error',function(err){	
});
play102.on('error',function(err){	
});
play103.on('error',function(err){	
});
play1.on('error',function(err){
});
play2.on('error',function(err){
});
play3.on('error',function(err){
});
play4.on('error',function(err){	
});
play5.on('error',function(err){	
});
play6.on('error',function(err){	
});
play7.on('error',function(err){	
});
play8.on('error',function(err){	
});
play9.on('error',function(err){	
});
play10.on('error',function(err){	
});
play11.on('error',function(err){	
});
play12.on('error',function(err){	
});
play13.on('error',function(err){	
});
play14.on('error',function(err){	
});
play15.on('error',function(err){	
});
play16.on('error',function(err){	
});
play17.on('error',function(err){	
});
play18.on('error',function(err){	
});
play19.on('error',function(err){	
});
play20.on('error',function(err){	
});
play21.on('error',function(err){	
});
play22.on('error',function(err){	
});
play23.on('error',function(err){	
});
play24.on('error',function(err){	
});
play25.on('error',function(err){	
});
play26.on('error',function(err){	
});
play27.on('error',function(err){	
});
play28.on('error',function(err){	
});
play29.on('error',function(err){	
});
play30.on('error',function(err){	
});
play31.on('error',function(err){	
});
play32.on('error',function(err){	
});
play33.on('error',function(err){	
});
play34.on('error',function(err){	
});
play35.on('error',function(err){	
});
play36.on('error',function(err){	
});
play37.on('error',function(err){	
});
play38.on('error',function(err){	
});
play39.on('error',function(err){	
});
play40.on('error',function(err){	
});
play41.on('error',function(err){	
});
play42.on('error',function(err){	
});
play43.on('error',function(err){	
});
play44.on('error',function(err){	
});
//set gpio
gpio.setup(11, gpio.DIR_IN, readInput),
gpio.setup(10, gpio.DIR_IN, readInput),
gpio.setup(8, gpio.DIR_IN, readInput),
gpio.setup(7, gpio.DIR_IN, readInput),
gpio.setup(13, gpio.DIR_IN, readInput),
gpio.setup(12, gpio.DIR_IN, readInput);

//img>base64
var data ="data:image/png;base64,";
function base64_encode(file){
	var bitmap = fs.readFileSync(file);
	return new Buffer(bitmap).toString('base64');
}


app.use(express.static(__dirname+'/images'));
app.use(express.static(__dirname+'/web'));

	
    var p11 = base64_encode(__dirname+'/images/img1-1.gif'),
	p12 = base64_encode(__dirname+'/images/img1-2.gif'),
	p13 = base64_encode(__dirname+'/images/img1-3.gif'),
	p14 = base64_encode(__dirname+'/images/img1-4.gif'),
	p15 = base64_encode(__dirname+'/images/img1-5.gif'),
	p21 = base64_encode(__dirname+'/images/img2-1.gif'),
	p22 = base64_encode(__dirname+'/images/img2-2.gif'),
	p23 = base64_encode(__dirname+'/images/img2-3.gif'),
	p24 = base64_encode(__dirname+'/images/img2-4.gif'),
	p31 = base64_encode(__dirname+'/images/img3-1.gif'),
	p32 = base64_encode(__dirname+'/images/img3-2.gif'),
	p33 = base64_encode(__dirname+'/images/img3-3.gif'),
	p34 = base64_encode(__dirname+'/images/img3-4.gif'),
	p35 = base64_encode(__dirname+'/images/img3-5.gif'),
	p41 = base64_encode(__dirname+'/images/img4-1.gif'),
	p42 = base64_encode(__dirname+'/images/img4-2.gif'),
	p43 = base64_encode(__dirname+'/images/img4-3.gif'),
	p44 = base64_encode(__dirname+'/images/img4-4.gif'),
	p45 = base64_encode(__dirname+'/images/img4-5.gif'),
	p51 = base64_encode(__dirname+'/images/img5-1.gif'),
	p52 = base64_encode(__dirname+'/images/img5-2.gif'),
	p53 = base64_encode(__dirname+'/images/img5-3.gif'),
	p54 = base64_encode(__dirname+'/images/img5-4.gif'),
	p61 = base64_encode(__dirname+'/images/img6-1.gif'),
	p62 = base64_encode(__dirname+'/images/img6-2.gif'),
	p63 = base64_encode(__dirname+'/images/img6-3.gif'),
	p64 = base64_encode(__dirname+'/images/img6-4.gif'),
	p65 = base64_encode(__dirname+'/images/img6-5.gif'),
	p71 = base64_encode(__dirname+'/images/img7-1.gif'),
	p72 = base64_encode(__dirname+'/images/img7-2.gif'),
	p73 = base64_encode(__dirname+'/images/img7-3.gif'),
	p74 = base64_encode(__dirname+'/images/img7-4.gif'),
	p75 = base64_encode(__dirname+'/images/img7-5.gif'),
	p76 = base64_encode(__dirname+'/images/img7-6.gif'),
	p81 = base64_encode(__dirname+'/images/img8-1.gif'),
	p82 = base64_encode(__dirname+'/images/img8-2.gif'),
	p83 = base64_encode(__dirname+'/images/img8-3.gif'),
	p84 = base64_encode(__dirname+'/images/img8-4.gif'),
	p85 = base64_encode(__dirname+'/images/img8-5.gif'),
	p91 = base64_encode(__dirname+'/images/img9-1.gif'),
	p92 = base64_encode(__dirname+'/images/img9-2.gif'),
	p93 = base64_encode(__dirname+'/images/img9-3.gif'),
	p94 = base64_encode(__dirname+'/images/img9-4.gif'),
	p95 = base64_encode(__dirname+'/images/img9-5.gif');

	

app.get('/users',function(req,res){
	res.sendFile(__dirname+'/web/data.html');
});
app.get('/sendemail',function(req,res){
	res.sendFile(__dirname+'/web/email.html');
});
app.get('/pic1',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic1.html');
});
app.get('/pic2',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic2.html');
});
app.get('/pic3',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic3.html');
});
app.get('/pic4',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic4.html');
});
app.get('/pic5',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic5.html');
});
app.get('/pic6',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic6.html');
});
app.get('/pic7',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic7.html');
});
app.get('/pic8',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic8.html');
});
app.get('/pic9',function(req,res){
	res.sendFile(__dirname+'/web/buttonpic9.html');
});
app.get('/menu',function(req,res){
	res.sendFile(__dirname+'/web/slide.html');
});
app.get('/',function(req,res){
	res.sendFile(__dirname+'/web/index.html');
});
app.get('/text1',function(req,res){
	res.sendFile(__dirname+'/web/buttontext1.html');
});
app.get('/text2',function(req,res){
	res.sendFile(__dirname+'/web/buttontext2.html');
});
app.get('/text3',function(req,res){
	res.sendFile(__dirname+'/web/buttontext3.html');
});
app.get('/text4',function(req,res){
	res.sendFile(__dirname+'/web/buttontext4.html');
});
app.get('/text5',function(req,res){
	res.sendFile(__dirname+'/web/buttontext5.html');
});
app.get('/text6',function(req,res){
	res.sendFile(__dirname+'/web/buttontext6.html');
});
app.get('/text7',function(req,res){
	res.sendFile(__dirname+'/web/buttontext7.html');
});
app.get('/text8',function(req,res){
	res.sendFile(__dirname+'/web/buttontext8.html');
});
app.get('/text9',function(req,res){
	res.sendFile(__dirname+'/web/buttontext9.html');
});

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "[Your Email]",
        pass: "[Your Password]"
    }
});
io.on('connection',function(socket){
	senduser=0;
	socket.on('email click',function(msq){
	console.log(msq),email=msq,sendemail=1;	
});//user
	socket.on('update click',function(msq){
	if(msq!=''){
	console.log(msq),nameuser=msq,status_add=1;}
});
	socket.on('delete click',function(msq){
	if(msq!=''){
	status_delete=1;}
});
	socket.on('test click',function(msq){
	
	console.log(msq);
	if(msq!=""){
	numtest=msq,status_test=1;
		if(msq==0){
			status_test =0;
			io.sockets.emit('chat message',' ');
			io.sockets.emit('chat message2',' ');
			btn_startrandom=0;
			question=0;
			answer=0;
		}
	}
});//user
	socket.on('title click',function(msq){
	console.log('title: ',msq),title=msq;	
});
	
	io.sockets.emit('ipaddress',ipuser);
	socket.on('button click',function(msq){
		if(msq==100){
		btnrandom=1,btnrandom2=1,btn_startrandom=1;
		}
		if(msq!=100){
		btnrandom2=0;
		}
		data_msq=msq;
	});
});
var txt_update;
var txt_all;
var txt_db='';
var txt_false;
var sta_false=0;
function readInput(){  


		  if(txt_false!=txt_update){
			txt_update=txt_false;
			db.all("SELECT * FROM users WHERE id=?",(numtest),function(err,row){	
			 row.forEach(function(row){	
				txt_db=row.txt;
			 })
			});
		    db.serialize(function(){
		   var stmtu=db.prepare("UPDATE users SET txt= ? WHERE name = ? ");
		   txt_all=txt_db+","+txt_update;
		   stmtu.run(txt_all,nameuser_test);
		   stmtu.finalize();
                   })		
	   }
	if(question!=0){
		if(question!=check_count){
		status_count=1;
		timer = new Stopwatch(60000);
		check_count=question;
		}
		if(status_count==1){
		timer.start();
		status_count=0;
		}
	}
	
	if(timer.ms!=0){
		timecount=parseInt(timer.ms/1000);
	}
	
	if(timecount!=time_update){
		io.sockets.emit('time count',timecount);
		
		time_update=timecount;
	      
		if(timecount==0){
		 if(sta_false==0){
			if(check_timetrue!='on'){
			 db.serialize(function(){
				point_false++,answer='0',play102.play(),timer.ms=0;
				var stmtf=db.prepare("UPDATE users SET false= +? WHERE name = ? ");
				stmtf.run(point_false,nameuser_test);
				stmtf.finalize();

				db.all("SELECT * FROM users WHERE id=?",(numtest),function(err,row){	
					 row.forEach(function(row){	
						txt_db=row.txt;
					 })
				});
				var stmtu=db.prepare("UPDATE users SET txt= ? WHERE name = ? ");
		  	        txt_all=txt_db+","+txt_false;
				stmtu.run(txt_all,nameuser_test);
			        stmtu.finalize();
			 })
			}else{check_timetrue='off'}
			if(question!=0&&btnrandom2==1){
			btn_startrandom=1,ranquest=1,btnrandom=0;
			}
		 }else{sta_false=0;}
		}
	      
	}

		if(data_msq=="11"){
		io.sockets.emit('addimage',' ',data+p11),question='001010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="12"){
		io.sockets.emit('addimage',' ',data+p12),question='011111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="13"){
		io.sockets.emit('addimage',' ',data+p13),question='010111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="14"){
		io.sockets.emit('addimage',' ',data+p14),question='101001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="15"){
		io.sockets.emit('addimage',' ',data+p15),question='011000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="21"){
		io.sockets.emit('addimage',' ',data+p21),question='001011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="22"){
		io.sockets.emit('addimage',' ',data+p22),question='001100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="23"){
		io.sockets.emit('addimage',' ',data+p23),question='010011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="24"){
		io.sockets.emit('addimage',' ',data+p24),question='010100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="31"){
		io.sockets.emit('addimage',' ',data+p31),question='001101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="32"){
		io.sockets.emit('addimage',' ',data+p32),question='001110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="33"){
		io.sockets.emit('addimage',' ',data+p33),question='101111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="34"){
		io.sockets.emit('addimage',' ',data+p34),question='011101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="35"){
		io.sockets.emit('addimage',' ',data+p35),question='011110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="41"){
		io.sockets.emit('addimage',' ',data+p41),question='101010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="42"){
		io.sockets.emit('addimage',' ',data+p42),question='001111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="43"){
		io.sockets.emit('addimage',' ',data+p43),question='010000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="44"){
		io.sockets.emit('addimage',' ',data+p44),question='010001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="45"){
		io.sockets.emit('addimage',' ',data+p45),question='011001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="51"){
		io.sockets.emit('addimage',' ',data+p51),question='010110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="52"){
		io.sockets.emit('addimage',' ',data+p52),question='011011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="53"){
		io.sockets.emit('addimage',' ',data+p53),question='010101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="54"){
		io.sockets.emit('addimage',' ',data+p54),question='011100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="61"){
		io.sockets.emit('addimage',' ',data+p61),question='100010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="62"){
		io.sockets.emit('addimage',' ',data+p62),question='010010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="63"){
		io.sockets.emit('addimage',' ',data+p63),question='100000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="64"){
		io.sockets.emit('addimage',' ',data+p64),question='011010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="65"){
		io.sockets.emit('addimage',' ',data+p65),question='110010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="71"){
		io.sockets.emit('addimage',' ',data+p71),question='100101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="72"){
		io.sockets.emit('addimage',' ',data+p72),question='100110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="73"){
		io.sockets.emit('addimage',' ',data+p73),question='110011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="74"){
		io.sockets.emit('addimage',' ',data+p74),question='101000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="75"){
		io.sockets.emit('addimage',' ',data+p75),question='100111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="76"){
		io.sockets.emit('addimage',' ',data+p76),question='101011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="81"){
		io.sockets.emit('addimage',' ',data+p81),question='100011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="82"){
		io.sockets.emit('addimage',' ',data+p82),question='100100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="83"){
		io.sockets.emit('addimage',' ',data+p83),question='110000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="84"){
		io.sockets.emit('addimage',' ',data+p84),question='101011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="85"){
		io.sockets.emit('addimage',' ',data+p85),question='100001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="91"){
		io.sockets.emit('addimage',' ',data+p91),question='110100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="92"){
		io.sockets.emit('addimage',' ',data+p92),question='101101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="93"){
		io.sockets.emit('addimage',' ',data+p93),question='110001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="94"){
		io.sockets.emit('addimage',' ',data+p94),question='101100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="95"){
		io.sockets.emit('addimage',' ',data+p95),question='110101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		
		if(data_msq=="ก"){
		io.sockets.emit('chat message',data_msq),question='001010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ข"){
		io.sockets.emit('chat message',data_msq),question='001011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฃ"){
		io.sockets.emit('chat message',data_msq),question='001100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ค"){
		io.sockets.emit('chat message',data_msq),question='001101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฅ"){
		io.sockets.emit('chat message',data_msq),question='001110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฆ"){
		io.sockets.emit('chat message',data_msq),question='001111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ง"){
		io.sockets.emit('chat message',data_msq),question='010000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="จ"){
		io.sockets.emit('chat message',data_msq),question='010001';
		if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฉ"){
		io.sockets.emit('chat message',data_msq),question='010010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ช"){
		io.sockets.emit('chat message',data_msq),question='010011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ซ"){
		io.sockets.emit('chat message',data_msq),question='010100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฌ"){
		io.sockets.emit('chat message',data_msq),question='010101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ญ"){
		io.sockets.emit('chat message',data_msq),question='010110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฏ"){
		io.sockets.emit('chat message',data_msq),question='010111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฎ"){
		io.sockets.emit('chat message',data_msq),question='011000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฐ"){
		io.sockets.emit('chat message',data_msq),question='011001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฑ"){
		io.sockets.emit('chat message',data_msq),question='011010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฒ"){
		io.sockets.emit('chat message',data_msq),question='011011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ณ"){
		io.sockets.emit('chat message',data_msq),question='011100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ด"){
		io.sockets.emit('chat message',data_msq),question='011101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ต"){
		io.sockets.emit('chat message',data_msq),question='011110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ถ"){
		io.sockets.emit('chat message',data_msq),question='011111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ท"){
		io.sockets.emit('chat message',data_msq),question='100000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ธ"){
		io.sockets.emit('chat message',data_msq),question='100001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="น"){
		io.sockets.emit('chat message',data_msq),question='100010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="บ"){
		io.sockets.emit('chat message',data_msq),question='100011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ป"){
		io.sockets.emit('chat message',data_msq),question='100100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ผ"){
		io.sockets.emit('chat message',data_msq),question='100101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฝ"){
		io.sockets.emit('chat message',data_msq),question='100110';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="พ"){
		io.sockets.emit('chat message',data_msq),question='100111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฟ"){
		io.sockets.emit('chat message',data_msq),question='101000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ภ"){
		io.sockets.emit('chat message',data_msq),question='101001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ม"){
		io.sockets.emit('chat message',data_msq),question='101010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ย"){
		io.sockets.emit('chat message',data_msq),question='101011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ร"){
		io.sockets.emit('chat message',data_msq),question='101011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ล"){
		io.sockets.emit('chat message',data_msq),question='101100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ว"){
		io.sockets.emit('chat message',data_msq),question='101101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ศ"){
		io.sockets.emit('chat message',data_msq),question='101111';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ษ"){
		io.sockets.emit('chat message',data_msq),question='110000';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ส"){
		io.sockets.emit('chat message',data_msq),question='110001';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ห"){
		io.sockets.emit('chat message',data_msq),question='110010';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฬ"){
		io.sockets.emit('chat message',data_msq),question='110011';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="อ"){
		io.sockets.emit('chat message',data_msq),question='110100';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}
		if(data_msq=="ฮ"){
		io.sockets.emit('chat message',data_msq),question='110101';
			if(status_sound==0){play103.play(),
			play103.on('playing',function(item){
			status_sound=1;
			});data_msq='';}}

		if(status_sound!=0){
		status_sound=0;
		}
if(btn_startrandom==1){
random.numbers({
		"number":1,
		"minimum":1,
		"maximum":88
		},function(error, data){
		if(error)throw error;
		questrandom=data;
		});
	btn_startrandom=0;
}
             
	gpio.read(11, function(err, value){
		if(value == 1){
		io6=1;}else{io6=0;}	
	});
	gpio.read(10, function(err, value){
		if(value == 1){
		io5=1;}else{io5=0;}	
	});
	gpio.read(8, function(err, value){
		if(value == 1){
		io4=1;}else{io4=0;}		
	});
	gpio.read(7, function(err, value){
		if(value == 1){
		io3=1;}else{io3=0;}		
	});
	gpio.read(13, function(err, value){
		if(value == 1){
		io2=1;}else{io2=0;}		
	});
	gpio.read(12, function(err, value){
		if(value == 1){
		io1=1;}else{io1=0;}		
	});
		if(io1==0&&io2==0&&io3==0&&io4==0&&io5==0&&io6==0){
		check='0',io.sockets.emit('chat message2',''),answer=0;
		}
		if(io1==0&&io2==0&&io3==1&&io4==0&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2','ก'),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play1.play();}}
		if(io1==0&&io2==0&&io3==1&&io4==0&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2','ข'),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play2.play();}}
		if(io1==0&&io2==0&&io3==1&&io4==1&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ฃ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play3.play();}}
		if(io1==0&&io2==0&&io3==1&&io4==1&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ค"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play4.play();}}
		if(io1==0&&io2==0&&io3==1&&io4==1&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ฅ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play5.play();}}
		if(io1==0&&io2==0&&io3==1&&io4==1&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ฆ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play6.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==0&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ง"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play7.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==0&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"จ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play8.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==0&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ฉ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play9.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==0&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ช"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play10.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==1&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ซ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play11.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==1&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ฌ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play12.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==1&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ญ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play13.play();}}
		if(io1==0&&io2==1&&io3==0&&io4==1&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ฎ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play14.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==0&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ฏ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play15.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==0&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ฐ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play16.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==0&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ฑ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play17.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==0&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ฒ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play18.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==1&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ณ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play19.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==1&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ด"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play20.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==1&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ต"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play21.play();}}
		if(io1==0&&io2==1&&io3==1&&io4==1&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ถ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play22.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==0&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ท"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play23.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==0&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ธ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play24.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==0&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"น"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play25.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==0&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"บ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play26.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==1&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ป"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play27.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==1&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ผ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play28.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==1&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ฝ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play29.play();}}
		if(io1==1&&io2==0&&io3==0&&io4==1&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"พ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play30.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==0&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ฟ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play31.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==0&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ภ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play32.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==0&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ม"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play33.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==0&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ย"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play34.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==0&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ร"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play35.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==1&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ล"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play36.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==1&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ว"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play37.play();}}
		if(io1==1&&io2==0&&io3==1&&io4==1&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ศ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play38.play();}}
		if(io1==1&&io2==1&&io3==0&&io4==0&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ษ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play39.play();}}
		if(io1==1&&io2==1&&io3==0&&io4==0&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ส"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play40.play();}}
		if(io1==1&&io2==1&&io3==0&&io4==0&&io5==1&&io6==0&&check==0){
		io.sockets.emit('chat message2',"ห"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play41.play();}}
		if(io1==1&&io2==1&&io3==0&&io4==0&&io5==1&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ฬ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play42.play();}}
		if(io1==1&&io2==1&&io3==0&&io4==1&&io5==0&&io6==0&&check==0){
		io.sockets.emit('chat message2',"อ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play43.play();}}
		if(io1==1&&io2==1&&io3==0&&io4==1&&io5==0&&io6==1&&check==0){
		io.sockets.emit('chat message2',"ฮ"),check=1,answer=[io1]+[io2]+[io3]+[io4]+[io5]+[io6];
		if(question==0){play44.play();}}

		
		
db.serialize(function(){

	//user
	if(status_add==1){
db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY AUTOINCREMENT,name text,true int,false int,txt text)");
	stmt = db.prepare("INSERT INTO users VALUES(NULL,?,?,?,NULL)");
  	stmt.run(nameuser,0,0);
	status_add = 0;
}
if(senduser==0){
db.all("SELECT * FROM users",function(err,row){	
	row.forEach(function(row){	
 	io.emit('user name',row.name),senduser=1;
	})
	});

}
if(status_test==1){
db.all("SELECT * FROM users WHERE id=?",(numtest),function(err,row){	
	row.forEach(function(row){	
	io.emit('user test',row.name);
	nameuser_test=row.name;
	point_true=row.true;
	point_false=row.false;
	})
	});
}
if(status_test==0){
	io.emit('user test','ไม่มีผู้ทดสอบ');
	pointtall=0;
	pointfall=0;
}

if(status_delete==1){
	db.all("delete from users");    
	db.all("delete from sqlite_sequence where name='users'");
	db.all("SELECT rowid FROM users ",function(err,row){	
	row.forEach(function(row){
 	console.log(row.id,row.name);
	})
	});
	status_delete=0;
	
}//user

	if(question!=0&&btnrandom2==1){

 	if(question==answer&&question!=0&&answer!=0&&check==1){
	btn_startrandom=1,ranquest=1,btnrandom=0;
	}

	if(question!=answer&&question!=0&&answer!=0&&check==1){
	ranquest=0;
	}
	   
	}
	
	if(numtest!=''&&numtest!=0){
	pointtall=point_true;
	pointfall=point_false;
	if(question!=0){
	if(question==answer&&question!=0&&answer!=0&&check==1){
	point_true++,answer='0',play101.play(),check_timetrue='on';
	var stmtt=db.prepare("UPDATE users SET true= +? WHERE name = ? ");
	stmtt.run(point_true,nameuser_test);
	stmtt.finalize();
	sta_false=1;
	}
	if(question!=answer&&question!=0&&answer!=0&&check==1){
	point_false++,answer='0',play102.play(),timer.ms=0;
	var stmtf=db.prepare("UPDATE users SET false= +? WHERE name = ? ");
	stmtf.run(point_false,nameuser_test);
	stmtf.finalize();
	sta_false=1;
	}
	}
	}else{}
	});//end db

	io.emit('true show',pointtall);
	io.emit('false show',pointfall);
		if(btnrandom==1){ranquest=1,btnrandom=0;}
		if(ranquest==1){

		if(questrandom=="1"){
		data_msq=11;
		}
		if(questrandom=="2"){
		data_msq=12;
		}
		if(questrandom=="3"){
		data_msq=13;
		}
		if(questrandom=="4"){
		data_msq=14;
		}
		if(questrandom=="5"){
		data_msq=15;
		}
		if(questrandom=="6"){
		data_msq=21;
		}
		if(questrandom=="7"){
		data_msq=22;
		}
		if(questrandom=="8"){
		data_msq=24;
		}
		if(questrandom=="9"){
		data_msq=25;
		}
		if(questrandom=="10"){
		data_msq=31;
		}
		if(questrandom=="11"){
		data_msq=32;
		}
		if(questrandom=="12"){
		data_msq=33;
		}
		if(questrandom=="13"){
		data_msq=34;
		}
		if(questrandom=="14"){
		data_msq=35;
		}
		if(questrandom=="15"){
		data_msq=41;
		}
		if(questrandom=="16"){
		data_msq=42;
		}
		if(questrandom=="17"){
		data_msq=43;
		}
		if(questrandom=="18"){
		data_msq=44;
		}
		if(questrandom=="19"){
		data_msq=45;
		}
		if(questrandom=="20"){
		data_msq=51;
		}
		if(questrandom=="21"){
		data_msq=52;
		}
		if(questrandom=="22"){
		data_msq=53;
		}
		if(questrandom=="23"){
		data_msq=54;
		}
		if(questrandom=="24"){
		data_msq=61;
		}
		if(questrandom=="25"){
		data_msq=62;
		}
		if(questrandom=="26"){
		data_msq=63;
		}
		if(questrandom=="27"){
		data_msq=64;
		}
		if(questrandom=="28"){
		data_msq=65;
		}
		if(questrandom=="29"){
		data_msq=71;
		}
		if(questrandom=="30"){
		data_msq=72;
		}
		if(questrandom=="31"){
		data_msq=73;
		}
		if(questrandom=="32"){
		data_msq=74;
		}
		if(questrandom=="33"){
		data_msq=75;
		}
		if(questrandom=="34"){
		data_msq=76;
		}
		if(questrandom=="35"){
		data_msq=81;
		}
		if(questrandom=="36"){
		data_msq=82;
		}
		if(questrandom=="37"){
		data_msq=83;
		}
		if(questrandom=="38"){
		data_msq=84;
		}
		if(questrandom=="39"){
		data_msq=85;
		}
		if(questrandom=="40"){
		data_msq=91;
		}
		if(questrandom=="41"){
		data_msq=92;
		}
		if(questrandom=="42"){
		data_msq=93;
		}
		if(questrandom=="43"){
		data_msq=94;
		}
		if(questrandom=="44"){
		data_msq=95;
		}
		
		if(questrandom=="45"){
		data_msq="ก";}
		if(questrandom=="46"){
		data_msq="ข";}
		if(questrandom=="47"){
		data_msq="ฃ";}
		if(questrandom=="48"){
		data_msq="ค";}
		if(questrandom=="49"){
		data_msq="ฅ";}
		if(questrandom=="50"){
		data_msq="ฆ";}
		if(questrandom=="51"){
		data_msq="ง";}
		if(questrandom=="52"){
		data_msq="จ";}
		if(questrandom=="53"){
		data_msq="ฉ";}
		if(questrandom=="54"){
		data_msq="ช";}
		if(questrandom=="55"){
		data_msq="ซ";}
		if(questrandom=="56"){
		data_msq="ฌ";}
		if(questrandom=="57"){
		data_msq="ญ";}
		if(questrandom=="58"){
		data_msq="ฏ";}
		if(questrandom=="59"){
		data_msq="ฎ";}
		if(questrandom=="60"){
		data_msq="ฐ";}
		if(questrandom=="61"){
		data_msq="ฑ";}
		if(questrandom=="62"){
		data_msq="ฒ";}
		if(questrandom=="63"){
		data_msq="ณ";}
		if(questrandom=="64"){
		data_msq="ด";}
		if(questrandom=="65"){
		data_msq="ต";}
		if(questrandom=="66"){
		data_msq="ถ";}
		if(questrandom=="67"){
		data_msq="ท";}
		if(questrandom=="68"){
		data_msq="ธ";}
		if(questrandom=="69"){
		data_msq="น";}
		if(questrandom=="70"){
		data_msq="บ";}
		if(questrandom=="71"){
		data_msq="ป";}
		if(questrandom=="72"){
		data_msq="ผ";}
		if(questrandom=="73"){
		data_msq="ฝ";}
		if(questrandom=="74"){
		data_msq="พ";}
		if(questrandom=="75"){
		data_msq="ฟ";}
		if(questrandom=="76"){
		data_msq="ภ";}
		if(questrandom=="77"){
		data_msq="ม";}
		if(questrandom=="78"){
		data_msq="ย";}
		if(questrandom=="79"){
		data_msq="ร";}
		if(questrandom=="80"){
		data_msq="ล";}
		if(questrandom=="81"){
		data_msq="ว";}
		if(questrandom=="82"){
		data_msq="ศ";}
		if(questrandom=="83"){
		data_msq="ษ";}
		if(questrandom=="84"){
		data_msq="ส";}
		if(questrandom=="85"){
		data_msq="ห";}
		if(questrandom=="86"){
		data_msq="ฬ";}
		if(questrandom=="87"){
		data_msq="อ";}
		if(questrandom=="88"){
		data_msq="ฮ";}
		ranquest=0;
		}
		if(question=='001010'){
			txt_false="ก";
			
			}
		if(question=='001011'){
			txt_false="ข";
			}
		if(question=='001100'){
			txt_false="ฃ";
			}
		if(question=='001101'){
			txt_false="ค";
			}
		if(question=='001110'){
			txt_false="ฅ";
			}
		if(question=='001111'){
			txt_false="ฆ";
			}
		if(question=='010000'){
			txt_false="ง";
			}
		if(question=='010001'){
			txt_false="จ";
		}
		if(question=='010010'){
			txt_false="ฉ";
			}
		if(question=='010011'){
			txt_false="ช";
			}
		if(question=='010100'){
			txt_false="ซ";
			}
		if(question=='010101'){
			txt_false="ฌ";
			}
		if(question=='010110'){
			txt_false="ญ";
			}
		if(question=='010111'){
			txt_false="ฏ";
			}
		if(question=='011000'){
			txt_false="ฎ";
			}
		if(question=='011001'){
			txt_false="ฐ";
			}
		if(question=='011010'){
			txt_false="ฑ";
			}
		if(question=='011011'){
			txt_false="ฒ";
			}
		if(question=='011100'){
			txt_false="ณ";
			}
		if(question=='011101'){
			txt_false="ด";
			}
		if(question=='011110'){
			txt_false="ต";
			}
		if(question=='011111'){
			txt_false="ถ";
			}
		if(question=='100000'){
			txt_false="ท";
			}
		if(question=='100001'){
			txt_false="ธ";
			}
		if(question=='100010'){
			txt_false="น";
			}
		if(question=='100011'){
			txt_false="บ";
			}
		if(question=='100100'){
			txt_false="ป";
			}
		if(question=='100101'){
			txt_false="ผ";
			}
		if(question=='100110'){
			txt_false="ฝ";
			}
		if(question=='100111'){
			txt_false="พ";
			}
		if(question=='101000'){
			txt_false="ฟ";
			}
		if(question=='101001'){
			txt_false="ภ";
			}
		if(question=='101010'){
			txt_false="ม";
			}
		if(question=='101011'){
			txt_false="ย";
			}
		if(question=='101011'){
			txt_false="ร";
			}
		if(question=='101100'){
			txt_false="ล";
			}
		if(question=='101101'){
			txt_false="ว";
			}
		if(question=='101111'){
			txt_false="ศ";
			}
		if(question=='110000'){
			txt_false="ษ";
			}
		if(question=='110001'){
			txt_false="ส";
			}
		if(question=='110010'){
			txt_false="ห";
			}
		if(question=='110011'){
			txt_false="ฬ";
			}
		if(question=='110100'){
			txt_false="อ";
			}
		if(question=='110101'){
			txt_false="ฮ";
			}

	}


var text_all_email;
var text1_email,text2_email,text3_email,text4_email,text5_email;
function SendEmail(){  
	//db.each("SELECT * FROM users ",function(err,row){
	mailOptions={
        to : email,
        subject : title,
	
        text :text_all_email+'\n'
	
    }
	
    	db.each("SELECT * FROM users WHERE id=1 ",function(err,row){		
 	text1_email= row.id+":"+row.name+":"+row.true+":"+row.false+":"+row.txt;
	});
	db.each("SELECT * FROM users WHERE id=2 ",function(err,row){		
 	text2_email= row.id+":"+row.name+":"+row.true+":"+row.false+":"+row.txt;
	});
	db.each("SELECT * FROM users WHERE id=3 ",function(err,row){		
 	text3_email= row.id+":"+row.name+":"+row.true+":"+row.false+":"+row.txt;
	});
	db.each("SELECT * FROM users WHERE id=4 ",function(err,row){		
 	text4_email= row.id+":"+row.name+":"+row.true+":"+row.false+":"+row.txt;
	});
	db.each("SELECT * FROM users WHERE id=5 ",function(err,row){		
 	text5_email= row.id+":"+row.name+":"+row.true+":"+row.false+":"+row.txt;
	});
	text_all_email=text1_email+'\n'+text2_email+'\n'+text3_email+'\n'+text4_email+'\n'+text5_email;
	
	if(sendemail==1){
	
    smtpTransport.sendMail(mailOptions, function(error, response){
	console.log(mailOptions);
	sendemail=0;
     if(error){
            console.log(error);
    
     }else{
            console.log("Message sent: " + response.message); 
	    
         }
	
});
}else{}
	
}


http.listen(5000,function(){
	console.log("socketon port 5000")
});

setInterval(readInput,1000);
setInterval(SendEmail,5000);