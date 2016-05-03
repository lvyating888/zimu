function game(box,start,pause,grade){
	
	
	// alert(box)
	this.star=start;
	this.pause=pause;
	this.grade=grade;

	
	this.box=box;
	this.letter=[];
	// 放字母
	this.letterArr=["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q"];
	this.speed=4;//字母落下的速度
	this.num=4;//初始的字母数量
	this.score=10;//成绩
	grade.innerHTML=this.score;

	
	//this.life=10;//生命
	this.level=1;//关卡

	/*获取浏览器的宽高*/
	this.lw=document.documentElement.clientWidth;
	this.lh=document.documentElement.clientHeight;
	
	// this.getletter(4);
	this.start();
}


//game方法
game.prototype={
	/*getletter*/
	 
	getletter:function(num){
		for(var i=0;i<num;i++){
			var div=document.createElement('div');
			div.style.cssText="position:absolute;width:80px;height:60px;text-align:center;line-height:60px;color:#000;font-size:25px;background:url(./img/3.png)no-repeat -8px  center;background-size: cover;font-weight:600;left:"+(Math.random()*(this.lw-400)+200)+"px;top:"+(Math.random()*(-50)-100)+"px";
			// console.log(Math.random()*(-50)-50)
			div.innerHTML=this.letterArr[Math.floor(Math.random()*this.letterArr.length)];
			this.box.appendChild(div);
			this.letter.push(div);
		}
	},
	play:function(){
		
		var that=this;
		var t;
		 t=setInterval(xia,50);
		function xia(){
			if(that.letter.length<that.num){
		that.getletter(that.num-that.letter.length);
				
				}
			for(var i=0;i<that.letter.length;i++){
				that.letter[i].style.top=that.speed+that.letter[i].offsetTop+"px";

				if(that.letter[i].offsetTop>that.lh){
					that.box.removeChild(that.letter[i]);
					that.letter.splice(i,1)
					that.score-=1;
					that.grade.innerHTML=that.score;
					if(that.score==0){
						alert('不好意思，失败了');
						that.speed=0;
					}
				    // console.log(that.score)
				}
				
				
			};
		}
		that.pause.onclick=function(){
			clearInterval(t);
			if(this.className=='pause'){
				this.className="goon";
				clearInterval(t);
				return;
			}else if(this.className=='goon'){
				this.className="pause";
				t=setInterval(xia,50);
			}
		}	
	},
	key:function(){
		var that=this;
		document.onkeydown=function(e){
			var ev=e||window.event;
			var lett=String.fromCharCode(ev.keyCode);
			for(var i=0;i<that.letter.length;i++){
				if(that.letter[i].innerHTML==lett){
					that.box.removeChild(that.letter[i]);
					that.letter.splice(i,1);
					that.score+=1;
					that.grade.innerHTML=that.score;
					if(that.score==100){
						alert('恭喜你闯关成功');
						that.speed=0;
					}
					//console.log(that.score)
					// break;
				}

			
				
			}

		}
	},
	start:function(){
		var that=this;
		var flag=true;
			this.star.onclick=function(){
				if(!flag){return};
				// if(that.speed==4) {
					flag=false;
					that.play();
					that.key();
				// };

				// if(that.speed==0){
				// 	alert(1)
				// 	that.score=10;
				// 	that.grade.innerHTML=that.score;
				// 	flag=true;

				// };
			}
			
		}	


}
