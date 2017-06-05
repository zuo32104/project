(function() {
	//加载动画
	var arrImg = [
		'img/bgWhite.jpg',
		'img/bg.jpg',
		'img/aa_woman.jpg',
		'img/glasses_guy.jpg',
		'img/aa_woman.jpg',
		'img/young_girl.jpg',
		'img/indian_guy2.jpg'
	];	

	var imgNum = 0;
	for (var i = 0; i < arrImg.length; i++) {
		var img = new Image();
		img.src = arrImg[i];
		img.onload = function () {
			imgNum ++;
			if (imgNum === arrImg.length) {
				$('#loadingPage').fadeOut();
			}
		}
		img.onerror = function () {
			imgNum ++;
			if (imgNum === arrImg.length) {
				$('#loadingPage').fadeOut();
			}
		}
	}




	/*
移动设备 相关处理
 */

	window.isMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	　　isMobile = true;
	}
	
	// 阻止移动端默认事件
	document.addEventListener("touchstart",(e) =>{
			e.preventDefault();
	},{passive:false});
	
	if(isMobile){		
		$('html').removeClass('no-touch');
		$('a').on('touchstart', function (ev) {
			target = ev.target;
			$('a').on('touchmove', function (ev) {
				target = null;
			});
			$('a').on('touchend', function (ev) {
				old = ev.target;
				if (target == old) {
					window.location = this.href;
				}
			})
		})
	}else{
		$('html').addClass('no-touch');
	}
	
	//请求的地址
	//window.state = referer;
	window.state =  fnRoute();
	
	

	isState();
	//生成不同的页面
	function isState(){	
		if( state === 'contact-me'){
			//联系视图
			html = template('temp-contact',{tempData:data.details.ContactMe})
			$('.ajax_content_container').html(html);
			fnPapeInit(data.details.ContactMe);
			window.otype = 'page';
		}else if(state==='adiso'){
			//home 的方法
			var homeInfo = template('temp-home',{tempData:data.details.HomeInfo})
			$('.ajax_content_container').html(homeInfo);
			fnHomeInit();
			window.otype = 'home';
			
		}else{
			var fang = true;
			for(var i=0;i<data.paging.length;i++){
				if(data.paging[i].name===state){
					html = template('temp-page',{tempData:data.details[data.paging[i].info]})
					$('.ajax_content_container').html(html);
					fnPapeInit(data.details[data.paging[i].info]);
					fang = false;
					window.otype = 'page';
					break;
				}
			}
			if(fang){
				var homeInfo = template('temp-home',{tempData:data.details.HomeInfo})
				$('.ajax_content_container').html(homeInfo);
				fnHomeInit();
				window.otype = 'home';
				
			}
		}	

	}
	//初始化home事件
	function fnHomeInit(){
		setMainImage.init('#l-main');
		homeAnimate.tweenTo('state1');
		fnHomeEvent();
		houmeTab();
	}

	function fnHomeEvent(){
		$('.home_slider_nav_right').on('click touchstart',{type:'next'},fnHomeTabEvent);
		$('.home_slider_nav_left').on('click touchstart',{type:'prev'},fnHomeTabEvent);
		$('#home_slider_box .home_slides a').on('click touchstart',fnTabPage);
	}

	function fnHomeTabEvent (ev){	
		houmeTab();		
		setMainImage.fnHomeTab(ev.data.type);
	}


	//菜单视图----------------------------------------------------------------------------	
	$('#menu_block').html( template('temp-menu',{tempData:data.paging}));
	var menuBtn = $('#menu_link');
	menuBtn.on('click touchstart',function(){	
		if($('body').hasClass('menu_link_open')){
			$('body').removeClass('menu_link_open');
			$('#menu_block').css({display:'none', opacity:0 })		
			if(menuBtn.otype === 'home')  houmeTab();
			window.otype = menuBtn.otype;
		}else{			
			$('body').addClass('menu_link_open');
			clearInterval(window.homeTabState);
			SetMenuContainer.init('#menu_block');
			menuBtn.otype = window.otype;
			window.otype = 'menu';
		}
	})

	//添加事件
	$('#menu_block a').on('click touchstart',fnTabPage);

	//跳转page
	function fnTabPage(ev){
		ev.preventDefault();
		ev.stopPropagation();		
		$('#slide_btn').css({ display:'none'})

		$(document).off("mousewheel DOMMouseScroll");
		
		var path = $(this).attr('href').match(/(\w+-?)+\//g);
		var str = '', html='';
	
		var pathname = path[path.length-1].replace(/\//g,'');

		for(var i=0; i<data.paging.length; i++){
			if(data.paging[i].name === pathname){
				str = data.paging[i].info;
				break;
			}
		}
		
		if(pathname==='home'){
			html = template('temp-home',{tempData:data.details[str]});	
			$('.ajax_content_container').html(html);
			fnHomeInit();
			window.otype = 'home';
		}else if(pathname==='contact-me'){
			html = template('temp-contact',{tempData:data.details[str]})
			$('.ajax_content_container').html(html);
			fnPapeInit(data.details[str]);
			window.otype = 'page';
		}else{
			html = template('temp-page',{tempData:data.details[str]})
			$('.ajax_content_container').html(html);
			fnPapeInit(data.details[str]);
			window.otype = 'page';
		}
		
		SetMenuContainer.fnCancelMenu();//取消 按钮视图

		$('body').removeClass('menu_link_open');
		window.history.pushState(html,'', pathname ==='home'?'/adiso': '/adiso/'+pathname);		
	}
	
	//分页-----------------------------------------------------------------------------------------------------------------
	
	//初始事件
	function fnPapeInit(dataName){
		SetPaging.init('#l-main',dataName);	
	}

	//history管理
	window.onpopstate = function(ev){	
		var historyHtml = ev.state || template('temp-home',{tempData:data.details.HomeInfo});
		window.state =  fnRoute();
		$('.ajax_content_container').html(historyHtml);
		if( state === 'contact-me'){
			fnPapeInit(data.details.ContactMe);
			window.otype = 'page';
		}else if(state==='adiso'){
			fnHomeInit();
			window.otype = 'home';
			$('#slide_btn').css('display','none')		
		}else{
			var fang = true;
			for(var i=0;i<data.paging.length;i++){
				if(data.paging[i].name===state){				
					fnPapeInit(data.details[data.paging[i].info]);
					fang = false;
					window.otype = 'page';
					break;
				}
			}
			if(fang){				
				fnHomeInit();				
				$('#slide_btn').css('display','none')
				window.otype = 'home';				
			}
		}	
		
	}

	//轮播效果
	function houmeTab(){
		clearInterval(window.homeTabState);
		window.homeTabState = setInterval(function(){			
			window.setMainImage.fnHomeTab('next')
		},7000)
	}
	//路由
	function fnRoute(){
		return window.location.pathname.match(/\/(\w+-?)+\/?$/g)[0].replace(/\//g,''); 
	}	
	

	//窗口调整大小的时候 视图变化
	$(window).on('resize',function(){			
		switch(otype){
			case 'page':
				SetPaging.resize();				
				break;
			case 'menu':
				SetMenuContainer.resize();			
				break;
			case 'home':
				setMainImage.resize();				
				break;
		}
	})
	
})()
