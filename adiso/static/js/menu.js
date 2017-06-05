;(function (){	
	//菜单视图的方法
	function SetMenuContainer(){
		
	}
	SetMenuContainer.prototype = {
		constructor:SetMenuContainer,
		init:function(ele){
			this.ele = $(ele);	
			this.ele.css({display:'block',opacity:1})
			this.resize();	
			this.fnHomeTab();
		},
		resize:function(){			
			var lSectionH = this.ele.find('.l-section-h');
			var bgSlices = this.ele.find('.bg_slices_h');
			this.dw = $(window).width(),this.dh= $(window).height();			
			this.ratio = 100/12;			
			if(this.dw<1272){				
				bgSlices.css({ width:1272, left:-(1272-this.dw)/2 });	
									
			}else{	
				bgSlices.css({ left:0, width:this.dw });
			}
			if(this.dh>400) lSectionH.css({"margin-top":(this.dh-lSectionH.height())/2})
		},
		fnHomeTab: function(){
			window.menuAimate = window.menuAimate || new TimelineMax();	
			var oPathnameArr = window.location.pathname.match( /\/(\w+-?)*\/?$/g);
			var oPathname = oPathnameArr[oPathnameArr.length-1].replace(/\//g,'');
		
			this.childs = this.ele.find('.main_nav_list').children();
			menuAimate.to($('#menu_block .mainmenu-nav-label'),0,{autoAlpha: 0})
			
			for(var i=0; i<this.childs.length;i++){
				if( this.childs.eq(i).data().name.trim() === oPathname){
					this.childs.tarEle = this.childs.eq(i);
					this.childs.fang = true;
					break ;
				}
			}

			if(!this.childs.fang) this.childs.tarEle = this.childs.eq(0);
			
			this.fnTabAnimate(this.childs.tarEle)
		},
		fnTabAnimate: function(tar){
			var tarBarW = tar.find('.line_lt span, .line_lb span, .line_rt span, .line_rb span');
			var tarBarH = tar.find('.line_l span, .line_r span');
			
			//设置菜单栏选中的线
			menuAimate.to(tar,0,{autoAlpha: 1});
			menuAimate.to(tar.find('.lines'),0,{autoAlpha: 1});
			menuAimate.to(tarBarW,0,{ width:'0%'});
			menuAimate.to(tarBarH,0,{ height:'0%'});

			menuAimate.to(this.ele.find('.bg_slice:odd'),0,{autoAlpha: 0,top:'-100%'})
			menuAimate.to(this.ele.find('.bg_slice:even'),0,{autoAlpha: 0,top:'100%'})
			menuAimate.staggerTo(this.ele.find('.bg_slice'),0.4,{autoAlpha: 1,top:0},0.04);
			menuAimate.staggerTo(this.ele.find('.mainmenu-nav-label'),0.4,{autoAlpha: 1},0.1,'-=0.2');
			menuAimate.to(tarBarW,0.3,{autoAlpha: 1, width:'100%'},'-=0.4');
			menuAimate.to(tarBarH,0.3,{autoAlpha: 1, height:'100%'},'-=0.3');

		},
		fnCancelMenu: function(){
			if(menuAimate) menuAimate.to(this.childs.tarEle.find('.lines'),0,{autoAlpha: 0});
			this.childs.tarEle.attr('style','');
			this.ele.css({display:'none',opacity:0});
		}
	}
	window.SetMenuContainer = new SetMenuContainer();	

})()