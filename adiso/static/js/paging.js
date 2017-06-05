;(function(){
	//分页视图的方法
	function SetPaging(){
		
	}

	SetPaging.prototype = {
		constructor:SetPaging,
		init: function (ele,dataName){
			this.ele = $(ele);
			this.container = this.ele.find('.ajax_content_container');
			this.containerChildrenSection = this.ele.find('.l-section');	
			this.btns = $('#slide_btn .slide_btn_item');
			clearInterval(window.homeTabState);
			this.isI = 0;
			this.slideBtns(dataName);
			this.resize();
			this.page();
		},
		slideBtns: function (dataName){
			if(dataName.length>1){
				var html = template('temp-btns',{tempData:dataName})
				$('#slide_btn').html(html);
				$('#slide_btn').css({
					display:'block',
					right:-200
				})
				TweenMax.to($('#slide_btn'),1,{right:10});
			}
		},
		resize: function (){
			this.dw = $(window).width(),this.dh= $(window).height();
			var bgSlicesH = this.ele.find('.bg_slices_h');

			this.container.css({height:'auto'});
			this.containerChildrenSection.css({
				'min-height': this.dh
			})	

			if(this.dw<1000){				
				bgSlicesH.css({left:(this.dw-bgSlicesH.width())/2})
			}else{
				bgSlicesH.css({left:0})
			}
			$(document).off("mousewheel DOMMouseScroll");

			this.fnPageEvent();
			this.fnpagePosition();
			this.fnIScroll();
		},
		fnIScroll:function(){
			if(window.myScroll) window.myScroll.destroy();
			window.myScroll = null;				
			if(window.isMobile){
				window.myScroll = new IScroll('#l-main', {
					scrollbars: true,
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
		page: function (){
			var _this = this;
			window.pageAnimate = new TimelineMax();	
			window.pageAnimate2 = new TimelineMax();	
			for(var i=0; i<this.containerChildrenSection.length; i++){
				(function(i){					
					pageAnimate.to({},0.4,{});	
					pageAnimate.to({},0,{
						onComplete:_this.fnComplete,
						onCompleteParams:[_this,i],
						onReverseComplete:_this.fnReverseComplete,
						onReverseCompleteParams:[_this,i-1]
					},'-=0.2')
					pageAnimate.add('state'+(i+1));	

				})(i)	
			}
			TweenMax.to(_this.container,0,{y:0});	
			pageAnimate.tweenTo('state1');
			pageAnimate.stop();	
		},
		pageTab:function (type){
			var currentTime = pageAnimate.getLabelTime(pageAnimate.currentLabel())		
			var beforeTime = pageAnimate.getLabelBefore(currentTime);//上一个状态
	  		var afterTime = pageAnimate.getLabelAfter(currentTime) ;//下一个状态
	  	  		
	   		if(type ==='next'){	   		  			 
	   			if(afterTime) pageAnimate.tweenTo(afterTime);	
	   		}else if(type ==='prev'){	
		   		if(beforeTime) pageAnimate.tweenTo(beforeTime);		   		
	   		} 

		},
		fnCancelPage: function (){	
			if(window.pageAnimate){
				console.log(window.pageAnimate.seek)
				window.pageAnimate.seek(0);
			}	
		},
		fnComplete: function (_this,i){	
			
			var curSection = _this.containerChildrenSection.eq(i);
			var positionTop = curSection.position().top;
			var oSelfH = curSection.height();//每一个高度
			
			//清除右侧按钮选中状态
			_this.btns = $('#slide_btn .slide_btn_item');
			_this.btns.removeClass('slide_btn_item_current');
			_this.btns.eq(i).addClass('slide_btn_item_current');

			//隔行换色
			i%2===0?$('body').addClass('color-alert'):$('body').removeClass('color-alert')
		
			var lSectionH = _this.containerChildrenSection.eq(i).find('.l-section-h');

			var titlebar = _this.containerChildrenSection.eq(i).find('.block_title');
			var barW = titlebar.find('.line_lt span, .line_lb span, .line_rt span, .line_rb span');
			var barH = titlebar.find('.line_l span, .line_r span');
			var barTitle = titlebar.find('h1');
			
			
			pageAnimate2.to(barW,0,{width:'0%'});
			pageAnimate2.to(barH,0,{height:'0%'});
			pageAnimate2.to(barTitle,0,{autoAlpha: 0});

			lSectionH.css({display:'none'});
			var bgSlices = _this.containerChildrenSection.eq(i).find('.bg_slices .bg_slices_h');
			var height = _this.containerChildrenSection.eq(i).height();
			
			var odd = bgSlices.find('.bg_slice:odd');
			var even = bgSlices.find('.bg_slice:even');
			var children = bgSlices.children();
			pageAnimate2.to(even,0,{top: -height,autoAlpha: 0})
			pageAnimate2.to(odd,0,{top: height,autoAlpha: 0})
			
			
		
			_this.translateY = -positionTop;

			pageAnimate2.to(_this.container,0.4,{
				y:_this.translateY
			})

			lSectionH.css({display:'block'});

			pageAnimate2.staggerTo(children,0.3,{top:0,autoAlpha: 1},0.03,'-=0.2');

			pageAnimate2.to(barW,0.4,{width:'100%'},'-=0.2');
			pageAnimate2.to(barH,0.4,{height:'100%'},'-=0.4');
			pageAnimate2.to(barTitle,0.4,{autoAlpha: 1}),'-=0.2';

			_this.isI = i;

		},
		fnReverseComplete: function(_this,i){

			_this.btns = $('#slide_btn .slide_btn_item');
			_this.btns.removeClass('slide_btn_item_current');
			_this.btns.eq(i).addClass('slide_btn_item_current');

			i%2===0?$('body').addClass('color-alert'):$('body').removeClass('color-alert')

			var lSectionH = _this.containerChildrenSection.eq(i).find('.l-section-h');

			var titlebar = _this.containerChildrenSection.eq(i).find('.block_title');
			var barW = titlebar.find('.line_lt span, .line_lb span, .line_rt span, .line_rb span');
			var barH = titlebar.find('.line_l span, .line_r span');
			var barTitle = titlebar.find('h1');

			pageAnimate2.to(barW,0,{width:'0%'});
			pageAnimate2.to(barH,0,{height:'0%'});
			pageAnimate2.to(barTitle,0,{autoAlpha: 0});

			lSectionH.css({display:'none'});

			var bgSlices = _this.containerChildrenSection.eq(i).find('.bg_slices .bg_slices_h');
			var height = _this.containerChildrenSection.eq(i).height();
			var odd = bgSlices.find('.bg_slice:odd');
			var even = bgSlices.find('.bg_slice:even');
			var children = bgSlices.children();
			pageAnimate2.to(even,0,{top: -height,autoAlpha: 0})
			pageAnimate2.to(odd,0,{top: height,autoAlpha: 0})

			var positionTop = _this.containerChildrenSection.eq(i).position().top;
			var oSelfH = _this.containerChildrenSection.eq(i).height();//每一个高度
		
			_this.translateY = -positionTop;			

			pageAnimate2.to(_this.container,0.4,{
				y:_this.translateY
			})
			lSectionH.css({display:'block'});
			pageAnimate2.staggerTo(children,0.2,{top:0,autoAlpha: 1},0.03,'-=0.2');

			pageAnimate2.to(barW,0.4,{width:'100%'},'-=0.2');
			pageAnimate2.to(barH,0.4,{height:'100%'},'-=0.4');
			pageAnimate2.to(barTitle,0.4,{autoAlpha: 1}),'-=0.2';

			_this.isI = i;
		},
		fnScroll: function(type,one){			
			if(type==='next') this.translateY = this.translateY - 50;
			if(type==='prev') this.translateY = this.translateY + 50;
			this.fnLimit();		
			
			this.container.css({
				transform:'translateY('+ this.translateY +'px'+')'
			})

			if( one ==='repeatedly') this.fnRepeatedly(type)
		},
		fnLimit: function(){//限制高度
			if(this.translateY>0){
				this.translateY = 0;
			}			
			if (this.translateY < this.dh-this.ele.find('.ajax_content_container').height()) {
				this.translateY = this.dh-this.ele.find('.ajax_content_container').height();
			}
		},
		fnRepeatedly: function(type){//滚动的时候判断当前是第几个 并且跳转到pageAnimeat状态	 	
			var itranslateY = this.container.css('transform').replace(/matrix\(|(\d+.?\d*,)+|\)/g,'')*1;
			var selfH = -this.containerChildrenSection.eq(this.isI).height();
			
			
			var top = -this.containerChildrenSection.eq(this.isI).position().top;	
			if(type==='next'){
				
				if( Math.abs(top+selfH - itranslateY) < this.dh/2){								
					this.isI++;
					this.btns.removeClass('slide_btn_item_current');
					this.btns.eq(this.isI).addClass('slide_btn_item_current');
					pageAnimate.seek('state'+(this.isI+1));
				}
			}
		
			if(type==='prev'){
				
				if(top<itranslateY && Math.abs(top - itranslateY) > this.dh/2){									
					this.isI--;
					this.btns.removeClass('slide_btn_item_current');
					this.btns.eq(this.isI).addClass('slide_btn_item_current');
					pageAnimate.seek('state'+(this.isI+1));				
				}
			}
		},
		fnPageEvent:function (){
			$(document).off("mousewheel DOMMouseScroll");
			// jquery 兼容的滚轮事件
			if($(window).width()>768){
				$(document).one("mousewheel DOMMouseScroll", {"_this":this},this.fnPageOneScoll);				
			}else{
				$(document).on("mousewheel DOMMouseScroll",{"_this":this},this.fnPageScoll);
			}
			
		},
		fnPageOneScoll: function (e){		
			var _this = e.data._this;
			var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
			                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));       // firefox
		   
		    if (delta > 0) { // 向上滚
		        _this.fnUp()
		    } else if (delta < 0) { // 向下滚		        
		        _this.fnDown()
		    }
		},
		fnDown:function(){
			var _this = this;
			var curSection = this.containerChildrenSection.eq(this.isI);
			var positionTop = curSection.position().top;
			var oSelfH = curSection.height();//每一个高度

			//获取到translateY;			
			var itranslateY = this.container.css('transform').replace(/matrix\(|(\d+.?\d*,)+|\)/g,'')*1;			
		
			if(itranslateY <= -(positionTop+oSelfH)- -this.dh){
				setTimeout(function (){
					$(document).one("mousewheel DOMMouseScroll",{"_this": _this}, _this.fnPageOneScoll);
				},1000);
				_this.pageTab('next');
			}else{
				this.fnScroll('next','one');
				$(document).one("mousewheel DOMMouseScroll",{"_this": _this}, _this.fnPageOneScoll);
			}			
			
		},
		fnUp:function(){
			var _this = this;
			var curSection = this.containerChildrenSection.eq(this.isI);
			var positionTop = curSection.position().top;
			var oSelfH = curSection.height();//每一个高度

			//获取到translateY;			
			var itranslateY = this.container.css('transform').replace(/matrix\(|(\d+.?\d*,)+|\)/g,'')*1;
			
			if(itranslateY >= -positionTop){
				setTimeout(function (){
					$(document).one("mousewheel DOMMouseScroll",{"_this": _this}, _this.fnPageOneScoll);
				},1000);
				_this.pageTab('prev');
			}else{
				this.fnScroll('prev','one');
				$(document).one("mousewheel DOMMouseScroll",{"_this": _this}, _this.fnPageOneScoll);
			}

		},
		fnPageScoll: function (e){			
			var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
		                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));           // firefox		  	
		  	var _this = e.data._this;
		    if (delta > 0) {
		        // 向上滚
		       _this.fnScroll('prev','repeatedly');
		    } else if (delta < 0) {
		        // 向下滚
		       _this.fnScroll('next','repeatedly');
		    }

		},
		fnpagePosition:function(){	
			var iSection = this.containerChildrenSection.eq(this.isI);		
			this.lateY = iSection.position().top;
			TweenMax.to(this.container,0.3,{y : -this.lateY }) //transform:'translateY('+ -this.lateY +'px)'
		}
		
	}

	window.SetPaging = new SetPaging();

})()