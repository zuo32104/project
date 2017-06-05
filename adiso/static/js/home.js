;(function(){
	//home 背景图 效果的实现
	function SetMainImage(){				
		
	};	
	SetMainImage.prototype = {
		constructor:SetMainImage,
		init:function(main){
			this.main = $(main);
			this.ele = $('#home_slider_box');		
			this.bgEle = this.ele.find(' .background_slides_box .background_slide');
			this.bgSlides = this.ele.find('.background_slides');
			this.fnHomePage();		
			this.main.find('.ajax_content_container').attr('style', '');
			this.resize();
		},
		resize:function(){			
			this.dw = $(window).width(),this.dh= $(window).height();			
			this.ratio = 100/12;	
			if(this.dw < 768){	
				this.fnHomeBg(980)				
			}else if(this.dw < 1272){	
				this.fnHomeBg(1272);
			}else{	
				this.fnHomeBg(this.dw)			
			}
			this.homeHomeText();			
			this.main.find('.ajax_content_container').css({'height':this.dh+1,'maring-top':'-1px'});			
			this.fnIScroll();
		},
		fnIScroll:function(){
			if(window.myScroll) window.myScroll.destroy();
			window.myScroll = null;	
			if(window.isMobile){					
				window.myScroll = new IScroll('#l-main', {
					scrollbars: false,
				    mouseWheel: true,
				    hScroll: false,
				    probeType: 4,
				    shrinkScrollbars:'scale',
				    interactiveScrollbars:false,	   
				    fadeScrollbars:true	,
				    click:false	  
				});	
			}
					
		},
		fnHomeBg:function (owidth){
			if(owidth/1.422222222222222>this.dh){
				this.bgSlides.css({left:-(owidth-this.dw)/2,width:owidth});	
				this.homePapeResize(owidth);
			}else{
				var w = this.dh*1.422222222222222*1.1;
				this.bgSlides.css({	width:w,left:-(w-this.dw)/2});	
				this.homePapeResize(w);	
			}
		},
		homeHomeText: function(){
			var lSection = $('#home_slider_box .l-section-h');
			if(this.dw>768){
				lSection.css({ "margin-top":( this.dh - 400 )/2 });
			}else{
				lSection.css({ "margin-top":( this.dh - 400 )/3 });
			}	
		},
		homePapeResize:function(widthNunm){				
			var _this = this;			
			this.bgEle.children().each(function(index,item){
				var children = $(item).children();						
				for(var i = 0,len = children.length; i < len; i++){					
					$(children[i]).css({
						"background-position":-widthNunm*(_this.ratio/100*i)+'px' +' center',
						"left":_this.ratio*i+'%',	
						"background-size": widthNunm
					})
				}
			})
		},
		fnHomePage: function (){
			var _this = this;
			var eles = $('.background_slides_box .background_slide');		
			window.homeAnimate = new TimelineMax();	
			window.homeAnimate2 = new TimelineMax();	
			for(var i=0; i<eles.length; i++){
				(function(i){
					if(i===0) homeAnimate.add('state0');
					homeAnimate.to({},1,{},'-=0.5');						
					homeAnimate.to({},0,{					
						onComplete:_this.fnComplete,
						onCompleteParams:[i],
						onReverseComplete:_this.fnReverseComplete,
						onReverseCompleteParams:[i,eles.length]
					});
					homeAnimate.add('state'+(i+1));	
				})(i)	
			}
			homeAnimate.add('stateEnd');
			homeAnimate.to({},0.5,{},'-=0.3');					
			homeAnimate.stop();	
			
		},		
		fnHomeTab: function (event){
			var type = typeof event==='object' ? event.data.type:event;
			
			var currentTime = homeAnimate.getLabelTime(homeAnimate.currentLabel())		
			var beforeTime = homeAnimate.getLabelBefore(currentTime);//上一个状态
	  		var afterTime = homeAnimate.getLabelAfter(currentTime) ;//下一个状态	  		
	   		if(type ==='next'){	   		  			 
	   			if(afterTime){		   			
					homeAnimate.tweenTo(afterTime);	
				} else {				
					homeAnimate.seek(0) //回到开始动画
					homeAnimate.tweenTo('state1')
				}
	   		}else if(type ==='prev'){	
		   		if(beforeTime!=='state0'){
		   			homeAnimate.tweenTo(beforeTime);	
		   		}else{		   			
		   			homeAnimate.seek(homeAnimate.totalDuration()) //回到开始动画
					homeAnimate.tweenTo('state5')
		   		}
		   		
	   		} 
		},		
		fnComplete:function(i){			
			//动画执行完毕调用	
			var ele = $('#background_slide_'+i);
			var homeTextBar = $('#home_slide'+i);
			if(i===0) {
				homeAnimate2.to(ele.parent().children(':last'),0,{"z-index":1});
			} 

			$('#home_slides').children().removeClass('current');
			homeAnimate2.to($('#home_slides').children(),0,{autoAlpha: 0,"z-index":1})

			homeAnimate2.to(ele,0,{autoAlpha: 1,"z-index":2});
			homeAnimate2.to(ele.find('.background_slide_fragment:even'),0,{autoAlpha: 0,top:100+'%'});
			homeAnimate2.to(ele.find('.background_slide_fragment:odd'),0,{autoAlpha: 0,top:-100+'%'});	
			

			var spanW = $('#home_slide'+i+' .line_lt, #home_slide'+i+' .line_lb ,#home_slide'+i+' .line_rt , #home_slide'+i+' .line_rb' );
			var spanH =  $('#home_slide'+i+' .line_l , #home_slide'+i+' .line_r');
			var titleH1 = homeTextBar.find('h1');
			var copyBlock = homeTextBar.find('.copy_block');
			
			//初始化动画前
			homeAnimate2.to(ele.find('.background_slide_fragment'), 0, { autoAlpha: 0} );			
			homeAnimate2.to(spanW.children(),0,{width:'0%'}); 
			homeAnimate2.to(spanH.children(),0,{height:'0%'}); 
			homeAnimate2.to(titleH1,0,{ autoAlpha: 0}); 
			homeAnimate2.to(copyBlock,0,{ autoAlpha: 0}); 
			homeTextBar.addClass('current');


			//执行动画
			homeAnimate2.to(homeTextBar,0,{autoAlpha: 1});
			homeAnimate2.staggerTo(ele.find('.background_slide_fragment'), 0.5, { autoAlpha: 1, top:0}, 0.1);
				
			homeAnimate2.to(spanW.children() ,1,{width:'100%'},'-=0.2')
			homeAnimate2.to(spanH.children() ,1,{height:'100%'},'-=1')
			homeAnimate2.to(titleH1 ,0.5,{autoAlpha: 1},'-=0.5')
			homeAnimate2.to(copyBlock ,0.5,{autoAlpha: 1},'-=0.5')	


			if(ele.prev().length){
				homeAnimate2.to(ele.prev(),0,{autoAlpha: 0,"z-index":1});
			}else{								
				homeAnimate2.to(ele.parent().children().last(),0,{autoAlpha: 0,"z-index":1});						
			}	


		},
		fnReverseComplete:function(i,len){
			//反向动画执行			
			var ele = $('#background_slide_'+i);	
			var homeTextBar = $('#home_slide'+i);			
			if(i===len-1) {
				homeAnimate2.to(ele.parent().children(':first'),0,{"z-index":1});				
			} 

			$('#home_slides').children().removeClass('current');
			homeAnimate2.to($('#home_slides').children(),0,{autoAlpha: 0,"z-index":1})

			homeAnimate2.to(ele,0,{autoAlpha: 1,"z-index":2});
			homeAnimate2.to(ele.find('.background_slide_fragment:even'),0,{autoAlpha: 0,top:100+'%'});
			homeAnimate2.to(ele.find('.background_slide_fragment:odd'),0,{autoAlpha: 0,top:-100+'%'});	

			
			

			var spanW = $('#home_slide'+i+' .line_lt, #home_slide'+i+' .line_lb ,#home_slide'+i+' .line_rt , #home_slide'+i+' .line_rb' );
			var spanH =  $('#home_slide'+i+' .line_l , #home_slide'+i+' .line_r');
			var titleH1 = homeTextBar.find('h1');
			var copyBlock = homeTextBar.find('.copy_block');
			
			//初始化动画前
			homeAnimate2.to(ele.find('.background_slide_fragment'), 0, { autoAlpha: 0} );			
			homeAnimate2.to(spanW.children(),0,{width:'0%'}); 
			homeAnimate2.to(spanH.children(),0,{height:'0%'}); 
			homeAnimate2.to(titleH1,0,{ autoAlpha: 0}); 
			homeAnimate2.to(copyBlock,0,{ autoAlpha: 0}); 
			homeTextBar.addClass('current');
			homeAnimate2.to(ele.next(),0,{"z-index":1});

			//执行动画
			homeAnimate2.to(homeTextBar,0,{autoAlpha: 1});
			homeAnimate2.staggerTo(ele.find('.background_slide_fragment'), 0.5, { autoAlpha: 1, top:0}, 0.1);
				
			homeAnimate2.to(spanW.children() ,1,{width:'100%'},'-=0.2')
			homeAnimate2.to(spanH.children() ,1,{height:'100%'},'-=1')
			homeAnimate2.to(titleH1 ,0.5,{autoAlpha: 1},'-=0.5')
			homeAnimate2.to(copyBlock ,0.5,{autoAlpha: 1},'-=0.5')	

		
			if(i>=len-1){				
				homeAnimate2.to(ele.parent().children().first(),0,{autoAlpha: 0,"z-index":1});
			}else{	
				homeAnimate2.to(ele.next(),0,{autoAlpha: 0,"z-index":1});
			}
		}

	}	
	window.setMainImage = new SetMainImage();
})()
